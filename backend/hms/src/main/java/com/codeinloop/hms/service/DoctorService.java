package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.DoctorResponse;
import com.codeinloop.hms.exceptionandconfig.ResourceNotFoundException;
import com.codeinloop.hms.mapper.DoctorMapper;
import com.codeinloop.hms.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Transactional(readOnly = true)
    public List<DoctorResponse> getAllActiveDoctors() {

        return doctorRepository.findAllByActiveTrue()
                .stream()
                .map(doctorMapper::doctorResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public DoctorResponse getDoctorById(Long id) {
        return doctorRepository.findByIdAndActiveTrue(id)
                .map(doctorMapper::doctorResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found: " + id));
    }

}
