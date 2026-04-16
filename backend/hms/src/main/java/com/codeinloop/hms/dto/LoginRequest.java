package com.codeinloop.hms.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
// removed jakarta.validation annotations to avoid automatic validation on binding; controller validates manually
import lombok.Data;

@Data
public class LoginRequest {

    @JsonProperty("email")
    @JsonAlias({"Email", "email", "username"})
    private String email;

    private String password;
}
