package com.coding.youtube.hospitalManagement.service;

import com.coding.youtube.hospitalManagement.dto.PatientResponseDto;
import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PatientService {


    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    public  List<PatientResponseDto> getAllPatients(Integer pageNumber, Integer pageSize) {
        return patientRepository.findAllPatients(PageRequest.of(pageNumber, pageSize))
                .stream()
                .map(patient -> modelMapper.map(patient, PatientResponseDto.class))
                .collect(Collectors.toList());
    }


//
//    @Transactional
//    public Patient getPatientById(Long id){
//       Patient p1 = patientRepository.findById(id).orElseThrow();
//        Patient p2 = patientRepository.findById(id).orElseThrow();
//
//        return p1;
//
//    }



}
