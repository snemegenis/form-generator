package service;

import bean.DisabilityReport;
import org.springframework.stereotype.Service;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
public interface DisabilityService {
    DisabilityReport create(DisabilityReport disabilityReport);
    DisabilityReport update(DisabilityReport disabilityReport);

}
