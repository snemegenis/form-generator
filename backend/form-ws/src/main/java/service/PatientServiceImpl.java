package service;

import bean.Patient;
import mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service("patientService")
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientMapper patientMapper;

    @Override
    public Patient get(int patientId) {
        return patientMapper.getById(patientId);
    }
}
