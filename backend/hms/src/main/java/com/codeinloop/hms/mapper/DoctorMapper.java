package com.codeinloop.hms.mapper;

import com.codeinloop.hms.dto.DoctorResponse;
import com.codeinloop.hms.dto.RegisterDoctorRequest;
import com.codeinloop.hms.entity.Doctor;
import com.codeinloop.hms.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public DoctorResponse doctorResponse(Doctor doctor){
        return DoctorResponse.builder()
                .id(doctor.getId())
                .firstName(doctor.getFirstName())
                .lastName(doctor.getLastName())
                .email(doctor.getEmail())
                .phone(doctor.getPhone())
                .specialization(doctor.getSpecialization())
                .licenseNumber(doctor.getLicenseNumber())
                .experienceYears(doctor.getExperienceYears())
                .department(doctor.getDepartment())
                .active(doctor.isActive())
                .build();
    }

    public Doctor toEntity(RegisterDoctorRequest request, PasswordEncoder passwordEncoder){
        Doctor doctor = new Doctor();
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setPhone(request.getPhone());
        doctor.setRole(Role.DOCTOR);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setDepartment(request.getDepartment());
        doctor.setActive(true);
        return doctor;
    }
}
