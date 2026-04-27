package com.codeinloop.hms.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookAppointmentRequest {

    @NotNull(message = "Doctor id is required")
    private Long doctorId;

    @NotNull(message = "Patient id is required")
    private Long patientId;

    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date must be in the future or present")
    private LocalDate appointmentDate;

    @NotNull(message = "Time slot is required")
    private LocalTime timeSlot;

    @NotBlank(message = "Reason for visit required")
    @Size(max = 500)
    private String reasonForVisit;

}
