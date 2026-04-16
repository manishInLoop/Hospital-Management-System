package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.PatientResponse;
import com.codeinloop.hms.mapper.PatientMapper;
import com.codeinloop.hms.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Transactional(readOnly = true)
    public List<PatientResponse> getAllActivePatients() {
        return patientRepository.findByActiveTrue()
                .stream()
                .map(patientMapper::patientResponse)
                .toList();
    }

}
