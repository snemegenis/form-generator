package service;

import bean.DisabilityReport;
import mapper.DisabilityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
public class DisabilityServiceImpl implements DisabilityService {

    @Autowired
    private DisabilityMapper disabilityMapper;

    @Override
    public DisabilityReport create(DisabilityReport disabilityReport) {
        if (disabilityReport.getPatient() == null) {
            throw new RuntimeException("patient is missing");
        }
        Integer patientId = disabilityReport.getPatient().getId();
        disabilityMapper.resetPatientStatus(patientId, false);

        disabilityReport.setCreated(LocalDateTime.now());
        disabilityReport.setModified(LocalDateTime.now());
        disabilityMapper.add(disabilityReport);

        Integer disabilityReportId = disabilityReport.getId();
        disabilityMapper.assignTreatments(disabilityReportId,
                disabilityReport.getTreatments());
        disabilityMapper.assignAppointments(disabilityReportId,
                disabilityReport.getAppointments());
        disabilityMapper.assignDiagnosis(disabilityReportId,
                Collections.singleton(disabilityReport.getMainDiagnosis()));
        if (disabilityReport.getOtherDiagnosis() != null &&
                disabilityReport.getOtherDiagnosis().size() > 0) {
            disabilityMapper.assignDiagnosis(disabilityReportId,
                    disabilityReport.getOtherDiagnosis());

        }
        disabilityMapper.assignDisabilities(disabilityReportId, disabilityReport.getDisabilityTypes());
        disabilityMapper.resetStatus(disabilityReportId, true);

        return disabilityReport;
    }
}
