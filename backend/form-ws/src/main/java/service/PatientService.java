package service;

import bean.Patient;

import java.util.List;

/**
 * Created by liutkvai on 11/20/2017.
 */
public interface PatientService {
    List<Patient> getList();

    Patient get(int patientId);

    Patient save(Patient patient);

    void delete(Integer patientId);
}
