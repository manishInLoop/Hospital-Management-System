package com.coding.youtube.hospitalManagement.controller;

import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class PatientController {

    private final PatientRepository patientRepository;

    @GetMapping("/patient")
    public ResponseEntity<List<Patient>> patientHome(){

        List<Patient> patients = patientRepository.findAll();
        return ResponseEntity.ok(patients);
    }
}
