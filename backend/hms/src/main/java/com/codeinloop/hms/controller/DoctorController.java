package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.AppointmentResponse;
import com.codeinloop.hms.dto.DoctorResponse;
import com.codeinloop.hms.repository.DoctorRepository;
import com.codeinloop.hms.service.AdminService;
import com.codeinloop.hms.service.AppointmentService;
import com.codeinloop.hms.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;
    private final AdminService adminService;
    private final AppointmentService appointmentService;


    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<DoctorResponse>> listDoctors(){
        return ResponseEntity.ok(doctorService.getAllActiveDoctors());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<DoctorResponse> getDoctor(@PathVariable Long id){

        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/{id}/schedule")
    @PreAuthorize("hasAnyAuthority('ROLE_DOCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<List<AppointmentResponse>> getDoctorSchedule(
            @PathVariable Long id, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        return ResponseEntity.ok(appointmentService.getDoctorSchedule(id, date));
    }




}
