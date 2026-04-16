package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.PatientResponse;
import com.codeinloop.hms.dto.RegisterPatientRequest;
import com.codeinloop.hms.service.AdminService;
import com.codeinloop.hms.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final AdminService adminService;


    @PostMapping("/register")
    public ResponseEntity<PatientResponse> register(
            @Valid @RequestBody RegisterPatientRequest request
            ){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.registerPatient(request));
    }
}
