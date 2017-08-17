package controller;

import bean.Patient;
import bean.request.PatientFilter;
import lombok.extern.slf4j.Slf4j;
import mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "list",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json")
    @CrossOrigin(origins = "http://localhost:8081")
    public List<Patient> getPatientList(@RequestBody PatientFilter filter) {
        return patientMapper.getListByFilter(filter.getDoctorId());
    }

}
