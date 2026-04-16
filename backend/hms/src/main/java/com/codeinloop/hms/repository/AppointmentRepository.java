package com.codeinloop.hms.repository;

import com.codeinloop.hms.entity.Appointment;
import com.codeinloop.hms.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    //Doctor schedule for a given day
    List<Appointment> findByDoctorIdAndAppointmentDateOrderByTimeSlotAsc(
            Long doctorId, LocalDate date
    );

    //All Appointments for patients
    List<Appointment> findByPatientIdOrderByAppointmentDateDescTimeSlotDesc(
            Long patientId
    );

    // Conflict check: is this doctor already booked at this date+slot?
    boolean existsByDoctorIdAndAppointmentDateAndTimeSlotAndStatusNot(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime timeSlot,
            AppointmentStatus status   // pass CANCELLED — i.e., ignore cancelled slots
    );

    long countByStatus(AppointmentStatus status);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentDate = :date")
    long countByDoctorIdAndDate(@Param("doctorId") Long doctorId, @Param("date") LocalDate date);
}
