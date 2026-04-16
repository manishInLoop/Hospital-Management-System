package com.codeinloop.hms.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String token;
    private String tokenType; //Always "Bearer"
    private Long userId;
    private String email;
    private String role;
    private String fullName;
}
