package com.coding.youtube.hospitalManagement.dto;

import lombok.Data;

@Data
public class OnBoardDoctorRequestDto {
    private long userId;
    private String specialization;
    private String name;
}
