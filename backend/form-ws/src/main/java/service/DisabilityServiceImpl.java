package service;

import bean.DisabilityReport;
import bean.DisabilityReportTmp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mapper.DisabilityMapper;
import mapper.DisabilityTmpMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
@Transactional
public class DisabilityServiceImpl implements DisabilityService {

    @Autowired
    private DisabilityMapper disabilityMapper;

    @Autowired
    private DisabilityTmpService disabilityTmpService;

    @Override
    public DisabilityReport save(DisabilityReport disabilityReport) {
        Integer patientId = disabilityReport.getPatientId();
        if (disabilityTmpService.exists(patientId)) {
            disabilityTmpService.remove(patientId);
        }
        disabilityMapper.resetPatientStatus(patientId, false);

        disabilityReport.setCreated(LocalDateTime.now());
        disabilityReport.setModified(LocalDateTime.now());
        disabilityMapper.add(disabilityReport);

        Integer disabilityReportId = disabilityReport.getId();
        disabilityMapper.assignTreatments(disabilityReportId, disabilityReport.getTreatments());
        disabilityMapper.assignAppointments(disabilityReportId, disabilityReport.getAppointments());
        disabilityMapper.assignDiagnosis(disabilityReportId,
                Collections.singleton(disabilityReport.getMainDiagnosis()));
        if (disabilityReport.getOtherDiagnosis() != null && disabilityReport.getOtherDiagnosis().size() > 0) {
            disabilityMapper.assignDiagnosis(disabilityReportId, disabilityReport.getOtherDiagnosis());

        }
        disabilityMapper.assignDisabilities(disabilityReportId, disabilityReport.getDisabilityTypes());
        disabilityMapper.resetStatus(disabilityReportId, true);
        return disabilityReport;
    }

}
