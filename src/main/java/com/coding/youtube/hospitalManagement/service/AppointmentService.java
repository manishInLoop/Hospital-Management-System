package com.coding.youtube.hospitalManagement.service;

import com.coding.youtube.hospitalManagement.entity.Appointment;
import com.coding.youtube.hospitalManagement.entity.Doctor;
import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.dto.AppointmentResponseDto;
import com.coding.youtube.hospitalManagement.repository.AppointmentRepository;
import com.coding.youtube.hospitalManagement.repository.DoctorRepository;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Secured("ROLE_PATIENT")
    public Appointment createNewAppointment(Appointment appointment, Long patientId, Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with id: " + doctorId));

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with id: " + patientId));

        if (appointment.getId() != null) {
            throw new IllegalArgumentException("New appointment cannot have an id");
        }
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        patient.getAppointments().add(appointment);// bidirectional consistency maintenance
        return appointmentRepository.save(appointment);

    }

    @Transactional
    @PreAuthorize("hasAuthority('appointment_write') OR #doctorId == authentication.principal.id)")
    public Appointment reAssignAppointmentToAnotherDoctor(Long appointmentId, Long doctorId){

        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();

        appointment.setDoctor(doctor); //this will call update automatically
        doctor.getAppointments().add(appointment);// bidirectional consistency maintenance
        return appointment;
    }


    @PreAuthorize("hasRole('ADMIN') OR (hasRole('DOCTOR') AND #doctorId == authentication.principal.id)")
    public List<AppointmentResponseDto> getAllAppointmentsOfDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
          return doctor.getAppointments()
                  .stream()
                  .map(appointment -> modelMapper.map(appointment, AppointmentResponseDto.class))
                  .collect(Collectors.toList());
    }
}
