package controller;

import bean.DisabilityReportParams;
import bean.Doctor;
import bean.Patient;
import bean.request.PatientFilter;
import constants.ReportConstants;
import mapper.PatientMapper;
import mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import report.ReportGenerator;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Report controller
 * Created by liutkvai on 6/27/2016.
 */
@RestController
@RequestMapping(value = "report", consumes = "application/json")
public class ReportController extends ControllerBase {

    @Autowired
    private ReportGenerator reportGenerator;

    @Autowired
    private ReportMapper reportMapper;

    @Autowired
    private PatientMapper patientMapper;

    @RequestMapping(value = "disability",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/pdf")
    @CrossOrigin(origins = "http://localhost:8081")
    public ResponseEntity<ByteArrayResource> print(@RequestBody DisabilityReportParams params) {
        HttpHeaders headers = addHeaders(new HttpHeaders());
        Patient patient = patientMapper.getById(params.getPatientId());
        final String reportName = patient.getFirstName() + "_" + patient.getLastName();
        headers.add("Content-Disposition", "attachment; filename=" + reportName + ".pdf");

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(ReportConstants.PARAM_PRINT_DATE, params.isFillDate());
        parameters.put(ReportConstants.PARAM_DATE, params.getDate());
        parameters.put(ReportConstants.PARAM_PRINT_NBR, params.isFillNumber());
        parameters.put(ReportConstants.PARAM_NBR, params.getNumber());
        parameters.put(ReportConstants.PARAM_USER, Doctor.builder()
                .code("AKM123").firstName("Vardiene").lastName("Pavardiene").occupation("Seimos gydytoja").build());

        try {
            byte[] reportData = reportGenerator
                    .generate("disability-report", parameters, Collections.singletonList(reportMapper
                            .getDisabilityReport(params.getPatientId())));
            if (reportData == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.ok().headers(headers).contentLength(reportData.length).contentType(MediaType
                    .parseMediaType("application/octet-stream"))
                    .body(new ByteArrayResource(reportData));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
}
