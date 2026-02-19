package com.coding.youtube.hospitalManagement.controller;

import com.coding.youtube.hospitalManagement.dto.LoginRequestDto;
import com.coding.youtube.hospitalManagement.dto.LoginResponseDto;
import com.coding.youtube.hospitalManagement.dto.SignupRequestDto;
import com.coding.youtube.hospitalManagement.dto.SignupResponseDto;
import com.coding.youtube.hospitalManagement.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
        }


        @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto signupRequestDto){
        return ResponseEntity.ok(authService.signup(signupRequestDto));
        }
}
