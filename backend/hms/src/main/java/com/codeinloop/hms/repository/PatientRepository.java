package com.codeinloop.hms.repository;

import com.codeinloop.hms.entity.Patient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByActiveTrue();
    Optional<Patient> findByIdAndActiveTrue(Long id);
    long countByActiveTrue();

    boolean existsByEmail(@NotBlank @Email String email);
}
