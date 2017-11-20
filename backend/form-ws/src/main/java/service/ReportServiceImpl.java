package service;

import bean.DisabilityReportParams;
import bean.Doctor;
import constants.ReportConstants;
import mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import report.ReportGenerator;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Service("reportService")
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportGenerator reportGenerator;

    @Autowired
    private ReportMapper reportMapper;

    @Override
    public byte[] get(DisabilityReportParams disabilityReportParams) {

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(ReportConstants.PARAM_PRINT_DATE, disabilityReportParams.isFillDate());
        parameters.put(ReportConstants.PARAM_DATE, disabilityReportParams.getDate());
        parameters.put(ReportConstants.PARAM_PRINT_NBR, disabilityReportParams.isFillNumber());
        parameters.put(ReportConstants.PARAM_NBR, disabilityReportParams.getNumber());
        parameters.put(ReportConstants.PARAM_USER, Doctor.builder()
                .code("AKM123")
                .firstName("Vardiene")
                .lastName("Pavardiene")
                .occupation("Seimos gydytoja")
                .build());

        try {
            byte[] result = reportGenerator.generate("disability-report", parameters,
                    Collections.singletonList(reportMapper.getDisabilityReport(disabilityReportParams.getPatientId())));
            if (result == null) {
                throw new RuntimeException("Report data is empty");
            }
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Error generating report data", e);
        }
    }
}
