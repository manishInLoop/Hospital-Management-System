package com.codeinloop.hms.mapper;

import com.codeinloop.hms.dto.PatientResponse;
import com.codeinloop.hms.dto.RegisterPatientRequest;
import com.codeinloop.hms.entity.Patient;
import com.codeinloop.hms.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PatientMapper {

    private final PasswordEncoder passwordEncoder;

    public PatientResponse patientResponse(Patient patient){
        return PatientResponse.builder()
                .id(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .dateOfBirth(LocalDate.from(patient.getDateOfBirth()))
                .bloodGroup(patient.getBloodGroup())
                .active(patient.isActive())
                .build();
    }

    public Patient toEntity(RegisterPatientRequest request, PasswordEncoder passwordEncoder){

        Patient patient = new Patient();
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setPhone(request.getPhone());
        patient.setRole(Role.PATIENT);
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setBloodGroup(patient.getBloodGroup());
        patient.setAllergies(patient.getAllergies());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setEmergencyContactPhone(request.getEmergencyContactPhone());
        patient.setEmergencyContactName(request.getEmergencyContactName());
        patient.setActive(true);

        return patient;
    }
}
