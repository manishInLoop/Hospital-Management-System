package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.AdminStatsResponse;
import com.codeinloop.hms.dto.DoctorResponse;
import com.codeinloop.hms.dto.PatientResponse;
import com.codeinloop.hms.dto.RegisterDoctorRequest;
import com.codeinloop.hms.service.AdminService;
import com.codeinloop.hms.service.DoctorService;
import com.codeinloop.hms.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final PasswordEncoder passwordEncoder;

//Dashboard

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats(){
        return ResponseEntity.ok(adminService.getStats());
    }

    //doctor management
    @PostMapping("/doctors")
    public ResponseEntity<DoctorResponse> registerResponse(@Valid @RequestBody RegisterDoctorRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.registerDoctor(request));
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorResponse>> listAllDoctors(){
        return ResponseEntity.ok(doctorService.getAllActiveDoctors());
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id){
        adminService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

    //Patient management
    @GetMapping("/patients")
    public ResponseEntity<List<PatientResponse>> listAllPatients(){
        return ResponseEntity.ok(patientService.getAllActivePatients());
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        adminService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }


}
