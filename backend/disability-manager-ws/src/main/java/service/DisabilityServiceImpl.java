package service;

import bean.Diagnosis;
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
import java.util.List;

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
        if (disabilityReport.getId() == null) {
            return create(disabilityReport);
        } else {
            return update(disabilityReport);
        }
    }

    private DisabilityReport create(DisabilityReport disabilityReport) {
        Integer patientId = disabilityReport.getPatientId();
        removeTmpInstance(patientId);

        disabilityReport.setCreated(LocalDateTime.now());
        disabilityReport.setModified(LocalDateTime.now());

        updateDiagnosis(disabilityReport);
        disabilityMapper.add(disabilityReport);
        Integer disabilityReportId = disabilityReport.getId();

        assignRelations(disabilityReport);
        updateStatus(patientId, disabilityReportId);

        return disabilityReport;

    }

    private DisabilityReport update(DisabilityReport disabilityReport) {
        Integer patientId = disabilityReport.getPatientId();
        removeTmpInstance(patientId);

        disabilityReport.setModified(LocalDateTime.now());

        updateDiagnosis(disabilityReport);
        disabilityMapper.update(disabilityReport);
        Integer disabilityReportId = disabilityReport.getId();

        removeRelations(disabilityReportId);
        assignRelations(disabilityReport);
        updateStatus(patientId, disabilityReportId);

        return disabilityReport;

    }

    private void removeTmpInstance(Integer patientId) {
        if (disabilityTmpService.exists(patientId)) {
            disabilityTmpService.remove(patientId);
        }
    }

    private void updateDiagnosis(DisabilityReport disabilityReport) {
        disabilityReport.getMainDiagnosis().setPrimary(true);
        List<Diagnosis> otherDiagnosis = disabilityReport.getOtherDiagnosis();
        if (otherDiagnosis != null) {
            for (Diagnosis diagnosis : otherDiagnosis) {
                diagnosis.setPrimary(false);
            }
        }
    }

    private void updateStatus(Integer patientId, Integer disabilityReportId) {
        disabilityMapper.resetPatientStatus(patientId, false);
        disabilityMapper.resetStatus(disabilityReportId, true);
    }

    private void assignRelations(DisabilityReport disabilityReport) {
        Integer disabilityReportId = disabilityReport.getId();
        disabilityMapper.assignTreatments(disabilityReportId, disabilityReport.getTreatments());
        disabilityMapper.assignAppointments(disabilityReportId, disabilityReport.getAppointments());
        disabilityMapper.assignDiagnosis(disabilityReportId,
                Collections.singleton(disabilityReport.getMainDiagnosis()));
        if (disabilityReport.getOtherDiagnosis() != null && disabilityReport.getOtherDiagnosis().size() > 0) {
            disabilityMapper.assignDiagnosis(disabilityReportId, disabilityReport.getOtherDiagnosis());

        }
        disabilityMapper.assignDisabilities(disabilityReportId, disabilityReport.getDisabilityTypes());
    }

    private void removeRelations(Integer disabilityReportId) {
        disabilityMapper.removeTreatments(disabilityReportId);
        disabilityMapper.removeAppointments(disabilityReportId);
        disabilityMapper.removeDiagnosis(disabilityReportId);
        disabilityMapper.removeDisabilities(disabilityReportId);
    }

}
