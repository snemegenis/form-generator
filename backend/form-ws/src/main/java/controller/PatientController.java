package controller;

import bean.Patient;
import lombok.extern.slf4j.Slf4j;
import mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by liutkvai on 7/14/2017.
 */
@RestController
@RequestMapping("patient")
@Slf4j
public class PatientController {

    @Autowired
    private PatientMapper patientMapper;

    @RequestMapping(value = "list", method = RequestMethod.GET, produces =
            "application/json")
    public List<Patient> getPatientList() {
        return patientMapper.getList();
    }

    @RequestMapping(value = "save", method = RequestMethod.POST, consumes = "application/json", produces =
            "application/json")
    public Patient savePatient(@RequestBody Patient patient) {
        if (patient.getId() == null) {
            patientMapper.add(patient);
        } else {
            int updatedRows = patientMapper.update(patient);
            if (updatedRows == 0) {
                log.warn("Update is not performed since patient id={} is found in the database. ", patient.getId());
            }
        }
        return patient;
    }

}
