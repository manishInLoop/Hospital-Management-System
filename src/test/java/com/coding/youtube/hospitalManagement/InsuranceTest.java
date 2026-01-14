package com.coding.youtube.hospitalManagement;

import com.coding.youtube.hospitalManagement.entity.Appointment;
import com.coding.youtube.hospitalManagement.entity.Insurance;
import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.service.AppointmentService;
import com.coding.youtube.hospitalManagement.service.InsuranceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest
public class InsuranceTest {

    @Autowired
    private InsuranceService insuranceService;

    @Autowired
    private AppointmentService appointmentService;

    @Test
    public void testInsurance(){
        Insurance insurance = Insurance.builder()
                .policyNumber("POL123456")
                .provider("ABC")
                .validTill(LocalDate.of(2026, 12, 31))
                .build();

        Patient patient = insuranceService.assignInsuranceToPatient(insurance, 1L);
        System.out.println(patient);

        var newPatient =insuranceService.disassociateInsuranceFromPatient(patient.getId());
        System.out.println(newPatient);
    }

    @Test
    public void testCreateAppointment(){
        Appointment appointment = Appointment.builder()
                .appointmentDate(LocalDateTime.of(2026, 1, 12, 10, 30))
                .reason("Regular Checkup")
                .build();

        var newAppointment = appointmentService.createNewAppointment(appointment, 1L, 1L);
        System.out.println(newAppointment);

        var updatedAppointment = appointmentService.reAssignAppointmentToAnotherDoctor(newAppointment.getId(),2L);
        System.out.println(updatedAppointment);
    }

}
