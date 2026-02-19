package com.coding.youtube.hospitalManagement;

import com.coding.youtube.hospitalManagement.entity.Patient;
import com.coding.youtube.hospitalManagement.repository.PatientRepository;
import com.coding.youtube.hospitalManagement.service.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;


@SpringBootTest
public class PatientTests {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientService patientService;

    @Test
    public void testPatientRepository(){
        List<Patient> patientList = patientRepository.findAllPatientsWithAppointmentsAndDoctors();
        System.out.println(patientList);

    }

    @Test
   public void  testTransactionMethods(){
//        Patient patient = patientService.getPatientById(1l);

//        Patient patient = patientRepository.findById(1L).orElseThrow(()->new EntityNotFoundException("Patient not found with id : 1"));
//        Patient patient = patientRepository.findByName("Amit Kumar");
//        List<Patient> patientList = patientRepository.findByBirthDateOrEmail(LocalDate.of(2001,03,22), "sita@gmail.com");

//        List<Patient> patientList = patientRepository.findByBloodGroup(bloodGroupType.A_NEGATIVE);

//        List<Patient> patientList = patientRepository.findByBornAfterDate(LocalDate.of(2001,9,30));
//
//        for(Patient patient: patientList){
//            System.out.println(patient);
//        }
//
//        List<Object[]> bloodGroupList = patientRepository.countEachBloodGroupType();
//
//        for(Object[] objects : bloodGroupList){
//            System.out.println(objects[0] + "" +objects[1]);
//        }
//
//
        Page<Patient> patients = patientRepository.findAllPatients(PageRequest.of(0,2, Sort.by("name")));
        for(Patient patient : patients){
            System.out.println(patient);
        }

//        int rowsUpdated = patientRepository.updateNameWithId("Manish Chaudhary", 1L);
//        System.out.println("Update successd" +rowsUpdated);

//        List<BloodGroupCountResponseEntity> bloodGroupList = patientRepository.countEachBloodGroupType();
//
//        for (BloodGroupCountResponseEntity bloodGroupCountResponse : bloodGroupList) {
//            System.out.println(bloodGroupCountResponse);
//        }

    }
}
