package service;

import bean.DisabilityReport;
import org.springframework.stereotype.Service;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
public interface DisabilityTmpService {
    void save(DisabilityReport disabilityReport);
    void remove(int patientId);
    boolean exists(int patientId);
    DisabilityReport get(int patientId);
}
