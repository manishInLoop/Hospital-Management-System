package com.coding.youtube.hospitalManagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentResponseDto {
    private Long id;
    private LocalDateTime localDateTime;
    private String reason;
    private DoctorResponseDto doctor;
}
