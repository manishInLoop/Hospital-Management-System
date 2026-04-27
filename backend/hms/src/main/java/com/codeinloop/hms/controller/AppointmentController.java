package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.AppointmentResponse;
import com.codeinloop.hms.dto.BookAppointmentRequest;
import com.codeinloop.hms.enums.AppointmentStatus;
import com.codeinloop.hms.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/book")
    @PreAuthorize("hasAnyAuthority('ROLE_PATIENT', 'ROLE_ADMIN')")
    public ResponseEntity<AppointmentResponse> book(
            @Valid @RequestBody BookAppointmentRequest request){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointmentService.bookAppointment(request));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyAuthority('ROLE_PATIENT', 'ROLE_ADMIN', 'ROLE_DOCTOR')")
    public ResponseEntity<List<AppointmentResponse>> getPatientAppointments(@PathVariable("patientId") Long patientId){
        return ResponseEntity.ok(appointmentService.getPatientAppointments(patientId));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @PathVariable("id") Long id, @RequestParam("status") AppointmentStatus status
            ) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

}
