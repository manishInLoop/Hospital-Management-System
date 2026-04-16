package com.codeinloop.hms.dto;

import com.codeinloop.hms.enums.Specialization;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Specialization specialization;
    private String licenseNumber;
    private Integer experienceYears;
    private String department;
    private boolean active;
}
