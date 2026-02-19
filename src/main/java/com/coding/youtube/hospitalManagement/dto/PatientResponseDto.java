package com.coding.youtube.hospitalManagement.dto;

import com.coding.youtube.hospitalManagement.entity.type.BloodGroupType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientResponseDto {
    private Long id;
    private String name;
    private LocalDate birthDate;
    private String gender;
    private BloodGroupType bloodGroup;
}
