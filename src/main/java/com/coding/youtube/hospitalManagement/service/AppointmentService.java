package com.coding.youtube.hospitalManagement.service;

import com.coding.youtube.hospitalManagement.entity.Appointment;
import com.coding.youtube.hospitalManagement.entity.Doctor;
import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.AppointmentRepository;
import com.coding.youtube.hospitalManagement.repository.DoctorRepository;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Transactional
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
    public Appointment reAssignAppointmentToAnotherDoctor(Long appointmentId, Long docotrId){

        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        Doctor doctor = doctorRepository.findById(docotrId).orElseThrow();

        appointment.setDoctor(doctor); //this will call update automatically
        doctor.getAppointments().add(appointment);// bidirectional consistency maintenance
        return appointment;
    }
}
