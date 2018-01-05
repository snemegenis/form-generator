package service;

import bean.Patient;
import lombok.extern.slf4j.Slf4j;
import mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
@Slf4j
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientMapper patientMapper;

    @Override
    public List<Patient> getList() {
        return patientMapper.getList();
    }

    @Override
    public Patient get(int patientId) {
        return patientMapper.getById(patientId);
    }

    @Override
    public Patient save(Patient patient) {
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

    @Override
    public void delete(Integer patientId) {
        patientMapper.delete(patientId);
    }
}
