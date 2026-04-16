package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.*;
import com.codeinloop.hms.entity.Admin;
import com.codeinloop.hms.entity.Doctor;
import com.codeinloop.hms.entity.Patient;
import com.codeinloop.hms.enums.AppointmentStatus;
import com.codeinloop.hms.enums.Role;
import com.codeinloop.hms.mapper.DoctorMapper;
import com.codeinloop.hms.mapper.PatientMapper;
import com.codeinloop.hms.repository.AppointmentRepository;
import com.codeinloop.hms.repository.DoctorRepository;
import com.codeinloop.hms.repository.PatientRepository;
import com.codeinloop.hms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final DoctorMapper doctorMapper;
    private final PatientMapper patientMapper;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;

//    @Transactional
//    public AdminResponse registerAdmin(RegisterAdminRequest request){
//
//        if(userRepository.existsByEmail(request.getEmail()))
//            throw new IllegalArgumentException("Email already in use: " + request.getEmail());
//
//        Admin admin = new Admin();
//        admin.setFirstName(request.getFirstName());
//        admin.setLastName(request.getLastName());
//        admin.setEmail(request.getEmail());
//        admin.setPassword(passwordEncoder.encode(request.getPassword()));
//        admin.setPhone(request.getPhone());
//        admin.setRole(Role.ADMIN);
//        admin.setActive(true);
//
//        Admin saved = userRepository.save(admin);
//
//        return AdminResponse.builder()
//                .id(saved.getId())
//                .firstName(saved.getFirstName())
//                .lastName(saved.getLastName())
//                .email(saved.getEmail())
//                .phone(saved.getPhone())
//                .active(saved.isActive())
//                .createdAt(saved.getCreatedAt())
//                .build();
//    }

    @Transactional
    public DoctorResponse registerDoctor(RegisterDoctorRequest request){

        if(userRepository.existsByEmail(request.getEmail()))
            throw new IllegalArgumentException("Email already in use: " + request.getEmail());

        if(doctorRepository.existsByLicenseNumber(request.getLicenseNumber()))
            throw new IllegalArgumentException("Lisense number already registered : " + request.getLicenseNumber());

        Doctor saved = doctorRepository.save(doctorMapper.toEntity(request, passwordEncoder));
        return doctorMapper.doctorResponse(saved);

    }

    //register patient
    @Transactional
    public PatientResponse registerPatient(RegisterPatientRequest request){

        if(patientRepository.existsByEmail(request.getEmail()))
            throw new IllegalArgumentException("Email already in use" + request.getEmail());

        Patient saved = patientRepository.save(patientMapper.toEntity(request, passwordEncoder));
        return patientMapper.patientResponse(saved);
    }

    @Transactional(readOnly = true)
    public AdminStatsResponse getStats(){
        return AdminStatsResponse.builder()
                .totalDoctors(doctorRepository.count())
                .activeDoctors(doctorRepository.countByActiveTrue())
                .totalPatients(patientRepository.count())
                .activePatients(patientRepository.count())
                .totalAppointments(appointmentRepository.count())
                .pendingAppointments(appointmentRepository.countByStatus(AppointmentStatus.PENDING))
                .cancelledAppointments(appointmentRepository.countByStatus(AppointmentStatus.CANCELLED))
                .confirmedAppointments(appointmentRepository.countByStatus(AppointmentStatus.CONFIRMED))
                .completedAppointments(appointmentRepository.countByStatus(AppointmentStatus.COMPLETED))
                .build();
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
