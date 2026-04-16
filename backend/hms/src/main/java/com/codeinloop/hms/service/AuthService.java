package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.LoginRequest;
import com.codeinloop.hms.dto.LoginResponse;
import com.codeinloop.hms.security.CustomUserDetails;
import com.codeinloop.hms.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;


    public LoginResponse login( LoginRequest request) {
        try {
            log.info("Login attempt for email: {}", request.getEmail());

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            log.info("Authentication successful for: {}", request.getEmail());

            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            log.info("JWT token generated for user: {} with authorities: {}",
                    request.getEmail(), userDetails.getAuthorities());

            return LoginResponse.builder()
                    .token(token)
                    .tokenType("Bearer")
                    .userId(userDetails.getId())
                    .email(userDetails.getEmail())
                    .role(userDetails.getAuthorities().iterator().next().getAuthority())
                    .build();
        } catch (AuthenticationException e) {
            log.error("Authentication failed for email: {} - Error: {}", request.getEmail(), e.getMessage());
            throw e;
        }
    }
}
