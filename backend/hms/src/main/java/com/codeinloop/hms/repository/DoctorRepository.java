package com.codeinloop.hms.repository;

import com.codeinloop.hms.entity.Doctor;
import com.codeinloop.hms.enums.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findAllByActiveTrue();
    List<Doctor> findBySpecializationAndActiveTrue(Specialization specialization);
    Optional<Doctor> findByIdAndActiveTrue(Long id);
    boolean existsByLicenseNumber(String licenseNumber);

    //custom jpql : find doctors who have no appointment on given date+time slot

    @Query("""
    SELECT d FROM Doctor d WHERE d.active = true AND
    d.specialization = :spec AND NOT EXISTS (
        SELECT a FROM Appointment a WHERE a.doctor = d
        AND a.appointmentDate = :date
        AND a.timeSlot = :slot
        AND a.status <> com.codeinloop.hms.enums.AppointmentStatus.CANCELLED
    )
""")

    List<Doctor> findAvailableDoctors(
            @Param("spec") Specialization spec,
            @Param("date") java.time.LocalDate date,
            @Param("slot") java.time.LocalTime slot
    );

    Long countByActiveTrue();
}
