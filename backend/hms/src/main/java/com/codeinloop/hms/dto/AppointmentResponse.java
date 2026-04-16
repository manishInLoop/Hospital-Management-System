package com.codeinloop.hms.dto;

import com.codeinloop.hms.enums.AppointmentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class AppointmentResponse {

    private Long id;
    private LocalDate appointmentDate;
    private LocalTime timeSlot;
    private AppointmentStatus status;
    private String reasonForVisit;
    private String notes;
    private LocalDateTime createdAt;

//flattened reference- not full entity exposure
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
}
