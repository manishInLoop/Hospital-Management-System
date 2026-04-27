package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.AppointmentResponse;
import com.codeinloop.hms.dto.BookAppointmentRequest;
import com.codeinloop.hms.entity.Appointment;
import com.codeinloop.hms.entity.Doctor;
import com.codeinloop.hms.entity.Patient;
import com.codeinloop.hms.enums.AppointmentStatus;
import com.codeinloop.hms.exceptionandconfig.ResourceNotFoundException;
import com.codeinloop.hms.exceptionandconfig.SlotNotAvailableException;
import com.codeinloop.hms.mapper.AppointmentMapper;
import com.codeinloop.hms.repository.AppointmentRepository;
import com.codeinloop.hms.repository.DoctorRepository;
import com.codeinloop.hms.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentMapper appointmentMapper;

    @Transactional
    public AppointmentResponse bookAppointment(BookAppointmentRequest request) {

       Doctor doctor = doctorRepository.findByIdAndActiveTrue(request.getDoctorId())
               .orElseThrow(() -> new ResourceNotFoundException(
                       "Doctor not found or inactive: " +request.getDoctorId()
               ));

        Patient patient = patientRepository.findByIdAndActiveTrue(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found or inactive: " + request.getPatientId()));

        //availability check
        boolean slotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndTimeSlotAndStatusNot(
                request.getDoctorId(),
                request.getAppointmentDate(),
                request.getTimeSlot(),
                AppointmentStatus.CANCELLED   //cancelled slots are free again
        );

        if(slotTaken){
            throw new SlotNotAvailableException(
                    "Dr. " + doctor.getFirstName() + " " + doctor.getLastName()
                    + " already has an appointment on " + request.getAppointmentDate()
                    + " at " + request.getTimeSlot()
            );
        }

        Appointment appointment = Appointment.builder()
                .doctor(doctor)
                .patient(patient)
                .appointmentDate(request.getAppointmentDate())
                .timeSlot(request.getTimeSlot())
                .reasonForVisit(request.getReasonForVisit())
                .status(AppointmentStatus.PENDING)
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        return appointmentMapper.appointmentResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getDoctorSchedule(Long doctorId, LocalDate date) {

        doctorRepository.findByIdAndActiveTrue(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found : " + doctorId));

        LocalDate filterDate = (date != null) ? date : LocalDate.now();

        return appointmentRepository
                .findByDoctorIdAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscTimeSlotAsc(doctorId, date)
                .stream()
                .map(appointmentMapper::appointmentResponse)
                .toList();
    }


    @Transactional(readOnly = true)
    public List<AppointmentResponse> getPatientAppointments(Long patientId) {
        return appointmentRepository
                .findByPatientIdOrderByAppointmentDateDescTimeSlotDesc(patientId)
                .stream()
                .map(appointmentMapper::appointmentResponse)
                .toList();
    }

    @Transactional
    public AppointmentResponse updateStatus(Long appointmentId, AppointmentStatus newStatus) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found : " + appointmentId));

        appointment.setStatus(newStatus);
        return appointmentMapper.appointmentResponse(appointmentRepository.save(appointment));
    }
}
