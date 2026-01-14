package com.coding.youtube.hospitalManagement.service;

import com.coding.youtube.hospitalManagement.entity.Insurance;
import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.InsuranceRepository;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;

    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientId){

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(()-> new EntityNotFoundException("patient not dound with id" + patientId));
        patient.setInsurance(insurance);
        insurance.setPatient(patient);// bidirectional consistency maintanence
        return patient;
    }

    @Transactional
    public Patient disassociateInsuranceFromPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow(()-> new EntityNotFoundException("Patient not found with id: " + patientId));
        patient.setInsurance(null);
        return patient;
    }
}
