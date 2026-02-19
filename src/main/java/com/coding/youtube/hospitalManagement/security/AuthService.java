package com.coding.youtube.hospitalManagement.security;

import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.entity.User;
import com.coding.youtube.hospitalManagement.dto.LoginRequestDto;
import com.coding.youtube.hospitalManagement.dto.LoginResponseDto;
import com.coding.youtube.hospitalManagement.dto.SignupRequestDto;
import com.coding.youtube.hospitalManagement.dto.SignupResponseDto;
import com.coding.youtube.hospitalManagement.entity.type.AuthProviderType;
import com.coding.youtube.hospitalManagement.entity.type.RoleType;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import com.coding.youtube.hospitalManagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final Authutil authutil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PatientRepository patientRepository;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String token = authutil.generateAccessToken(user);

        return new LoginResponseDto(token, user.getId());
    }

    public User signupInternal(SignupRequestDto signupRequestDto, AuthProviderType authProviderType, String providerId) {
        User user = userRepository.findByUsername(signupRequestDto.getUsername()).orElse(null);
        if(user != null) throw new IllegalArgumentException("Username already exists");

        user = User.builder()
                .username(signupRequestDto.getUsername())
                .providerId(providerId)
                .providerType(authProviderType)
                .roles(signupRequestDto.getRoles()) //role patient
                .build();

        if(authProviderType == AuthProviderType.Email){
            user.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
        }

        user = userRepository.save(user);
        Patient patient = Patient.builder()
                .name(signupRequestDto.getName())
                .email(signupRequestDto.getUsername())
                .user(user)
                .build();
        patientRepository.save(patient);

        return user;
    }

    //logincontroller
    public  SignupResponseDto signup(SignupRequestDto signupRequestDto) {

        User user = signupInternal(signupRequestDto, AuthProviderType.Email, null);
        return new SignupResponseDto(user.getId(), user.getUsername());
//        SignupResponseDto responseDto = new SignupResponseDto();
//        responseDto.setId(newUser.getId());
//        responseDto.setUsername(newUser.getUsername());
//        return responseDto;
    }

    @Transactional
    public ResponseEntity<LoginResponseDto> handleOAuth2LoginRequest(OAuth2User oAuth2User, String registrationID) {
        //fetch providerid and providertype
        // save providerid and providertype id info with user
        // if user has an account directly login
        //otherwise, first signup and then login

        AuthProviderType providerType = authutil.getProviderTypeFromRegistrationId(registrationID);
        String providerId = authutil.determineProviderIdFromOAuth2User(oAuth2User, registrationID);

        User user = userRepository.findByProviderIdAndProviderType(providerId, providerType).orElse(null);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        User emailUser = userRepository.findByUsername(email).orElse(null);

        if(user == null && emailUser == null){
            //signup flow
            String username = authutil.determineUsernameFromOAuth2User(oAuth2User, registrationID, providerId);
            user = signupInternal(new SignupRequestDto(username, null, name, Set.of(RoleType.PATIENT)),providerType, providerId);
        }else if(user != null){
            if(email != null && !email.isBlank() && !email.equals(user.getUsername())){
                user.setUsername(email);
                userRepository.save(user);
            }
        }else{
            throw new BadCredentialsException("This email is already registered with provider : " +emailUser.getProviderType());
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(authutil.generateAccessToken(user), user.getId());
        return ResponseEntity.ok(loginResponseDto);

    }

}
