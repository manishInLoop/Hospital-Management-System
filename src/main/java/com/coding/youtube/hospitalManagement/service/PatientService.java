package com.coding.youtube.hospitalManagement.service;

import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PatientService {


    private final PatientRepository patientRepository;

    @Transactional
    public Patient getPatientById(Long id){
       Patient p1 = patientRepository.findById(id).orElseThrow();
        Patient p2 = patientRepository.findById(id).orElseThrow();

        return p1;

    }

}
