package service;

import bean.DisabilityReport;
import bean.DisabilityReportParams;
import bean.Doctor;
import constants.ReportConstants;
import exception.DisabilityException;
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
@Service
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
        parameters.put(ReportConstants.PARAM_USER, disabilityReportParams.getDoctor());

        try {
            byte[] result = reportGenerator.generate("disability-report", parameters,
                    Collections.singletonList(reportMapper.getDisabilityReport(disabilityReportParams.getPatientId(),
                            null)));
            if (result == null) {
                throw new DisabilityException("Report data is empty");
            }
            return result;
        } catch (Exception e) {
            throw new DisabilityException("Error generating report data", e);
        }
    }

    @Override
    public DisabilityReport get(Integer disabilityReportId) {
        return reportMapper.getDisabilityReport(null, disabilityReportId);
    }
}
