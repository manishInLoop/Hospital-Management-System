package com.codeinloop.hms.dto;

import com.codeinloop.hms.enums.Specialization;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDoctorRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Email(message = "Valid email required")
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number")
    private String phone;

    @NotNull(message = "Specialization is required")
    private Specialization specialization;

    @NotNull(message = "License number is required")
    private String licenseNumber;

    @Min(0)
    @Max(60)
    private Integer experienceYears;

    private String department;
}
