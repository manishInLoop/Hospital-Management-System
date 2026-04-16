package com.codeinloop.hms.mapper;

import com.codeinloop.hms.dto.AppointmentResponse;
import com.codeinloop.hms.entity.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {
    public AppointmentResponse appointmentResponse(Appointment appointment){

        return AppointmentResponse.builder()
                .id(appointment.getId())
                .appointmentDate(appointment.getAppointmentDate())
                .timeSlot(appointment.getTimeSlot())
                .status(appointment.getStatus())
                .reasonForVisit(appointment.getReasonForVisit())
                .notes(appointment.getNotes())
                .createdAt(appointment.getCreatedAt())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName())
                .doctorSpecialization(appointment.getDoctor().getSpecialization().name())
                .build();

    }
}
