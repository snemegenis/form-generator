package controller;

import bean.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import service.PatientService;
import util.ValidationHelper;

import java.util.Collections;
import java.util.List;

/**
 * Created by liutkvai on 7/14/2017.
 */
@RestController
@RequestMapping("patient")
public class PatientController extends ControllerBase{

    @Autowired
    private PatientService patientService;

    @RequestMapping(value = "list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Patient> getPatientList() {
        List<Patient> result = patientService.getList();
        return result == null ? Collections.emptyList() : result;
    }

    @RequestMapping(value = "save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Patient savePatient(@RequestBody Patient patient) {
        ValidationHelper.validateRequired("patient", patient);
        return patientService.save(patient);
    }

}
