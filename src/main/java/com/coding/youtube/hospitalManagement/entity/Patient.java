package com.coding.youtube.hospitalManagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@ToString
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ToString.Exclude
    private LocalDate birthDate;
    private String email;
    private String gender;
}
