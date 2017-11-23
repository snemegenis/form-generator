package service;

import bean.DisabilityReport;
import bean.DisabilityReportTmp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import exception.DisabilityException;
import mapper.DisabilityMapper;
import mapper.DisabilityTmpMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service
@Transactional
public class DisabilityTmpServiceImpl implements DisabilityTmpService {

    @Autowired
    private DisabilityTmpMapper disabilityTmpMapper;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public void save(DisabilityReport disabilityReport) {
        Integer patientId = disabilityReport.getPatientId();

        byte[] data;
        try {
            data = mapper.writeValueAsBytes(disabilityReport);
        } catch (JsonProcessingException e) {
            throw new DisabilityException("Disability report serialization failed", e);
        }

        DisabilityReportTmp disabilityReportTmp = disabilityTmpMapper.get(patientId);
        if (disabilityReportTmp == null) {
            disabilityReportTmp = DisabilityReportTmp.builder().patientId(patientId).data(data).build();
            disabilityTmpMapper.add(disabilityReportTmp);
        } else {
            disabilityReportTmp.setData(data);
            disabilityTmpMapper.update(disabilityReportTmp);
        }
    }

    @Override
    public void remove(int patientId) {
        disabilityTmpMapper.delete(patientId);
    }

    @Override
    public boolean exists(int patientId) {
        return disabilityTmpMapper.exists(patientId);
    }

    @Override
    public DisabilityReport get(int patientId) {
        DisabilityReport disabilityReport = null;
        DisabilityReportTmp disabilityReportTmp = disabilityTmpMapper.get(patientId);
        if (disabilityReportTmp != null) {
            try {
                disabilityReport = mapper.readValue(disabilityReportTmp.getData(), DisabilityReport.class);
            } catch (IOException e) {
                throw new DisabilityException("Disability report deserialization failed", e);
            }
        }
        return disabilityReport;
    }

}
