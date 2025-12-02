package com.coding.youtube.hospitalManagement.repository;

import com.coding.youtube.hospitalManagement.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
