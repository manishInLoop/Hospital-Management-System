package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.LoginRequest;
import com.codeinloop.hms.dto.LoginResponse;
import com.codeinloop.hms.dto.PatientResponse;
import com.codeinloop.hms.dto.RegisterPatientRequest;
import com.codeinloop.hms.service.AdminService;
import com.codeinloop.hms.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody(required = false) LoginRequest request,
                                               HttpServletRequest httpRequest){

        if(request != null){
            log.info("Login attempt: received JSON body; email present={}", StringUtils.hasText(request.getEmail()));
        }

        // If JSON body wasn't provided (e.g., form-data or x-www-form-urlencoded from Postman),
        // fall back to request parameters.
        if(request == null || !StringUtils.hasText(request.getEmail()) || !StringUtils.hasText(request.getPassword())){
            log.info("Login attempt: JSON body missing or incomplete, checking request parameters");
            String email = httpRequest.getParameter("email");
            if(!StringUtils.hasText(email)){
                email = httpRequest.getParameter("Email");
            }
            if(!StringUtils.hasText(email)){
                email = httpRequest.getParameter("username");
            }
            String password = httpRequest.getParameter("password");

            log.info("Login attempt: param email present={}", StringUtils.hasText(email));

            if(!StringUtils.hasText(email) || !StringUtils.hasText(password)){
                // return a clear 400 instead of letting Spring raise MethodArgumentNotValidException
                log.warn("Login failed: missing email or password");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            LoginRequest mapped = new LoginRequest();
            mapped.setEmail(email);
            mapped.setPassword(password);
            request = mapped;
        }

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<PatientResponse> register(@jakarta.validation.Valid @RequestBody RegisterPatientRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.registerPatient(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication){
        if(authentication == null || !authentication.isAuthenticated()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        Object principal = authentication.getPrincipal();
        // return a compact view of principal and authorities for debugging
        return ResponseEntity.ok(new Object(){
            public final Object user = principal;
            public final Object authorities = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority).toList();
        });
    }
}
