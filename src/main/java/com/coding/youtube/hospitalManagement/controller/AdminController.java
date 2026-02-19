package com.coding.youtube.hospitalManagement.controller;

import com.coding.youtube.hospitalManagement.dto.DoctorResponseDto;
import com.coding.youtube.hospitalManagement.dto.OnBoardDoctorRequestDto;
import com.coding.youtube.hospitalManagement.dto.PatientResponseDto;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import com.coding.youtube.hospitalManagement.service.DoctorService;
import com.coding.youtube.hospitalManagement.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PatientService patientService;
    private final PatientRepository patientRepository;
    private final DoctorService doctorService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientResponseDto>> getAllPatients(
            @RequestParam(value = "page", defaultValue = "0") Integer pageNumber,
            @RequestParam(value = "size", defaultValue = "10") Integer pageSize
    ){
        return ResponseEntity.ok(patientService.getAllPatients(pageNumber, pageSize));

    }

    @PostMapping("/onBoardNewDoctor")
    public ResponseEntity<DoctorResponseDto> onBoardNewDoctor(@RequestBody OnBoardDoctorRequestDto onBoardDoctorRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.onBoardNewDoctor(onBoardDoctorRequestDto));
    }

}
