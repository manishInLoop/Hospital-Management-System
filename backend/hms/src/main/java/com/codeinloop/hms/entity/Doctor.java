package com.codeinloop.hms.entity;

import com.codeinloop.hms.enums.Specialization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@DiscriminatorValue("DOCTOR")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor extends User{

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Specialization specialization;

    @Column(nullable = false)
    private String licenseNumber;

    private Integer experienceYears;

    private String department;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();


}
