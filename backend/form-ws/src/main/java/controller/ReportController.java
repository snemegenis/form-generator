package controller;

import bean.Doctor;
import bean.Patient;
import constants.ReportConstants;
import lombok.extern.slf4j.Slf4j;
import mapper.PatientMapper;
import mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import report.ReportGenerator;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Report controller
 * Created by liutkvai on 6/27/2016.
 */
@RestController
@RequestMapping(value = "report")
@Slf4j
public class ReportController extends ControllerBase {

    @Autowired
    private ReportGenerator reportGenerator;

    @Autowired
    private ReportMapper reportMapper;

    @Autowired
    private PatientMapper patientMapper;

    @RequestMapping(value = "patient/{id}/disability",
            method = RequestMethod.GET,
            produces = "application/pdf")
    public ResponseEntity<ByteArrayResource> print(@PathVariable("id") Integer patientId,
            @RequestParam(value = "fillDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fillDate,
            @RequestParam(value = "fillNumber", required = false) Integer fillNumber) {
        HttpHeaders headers = addHeaders(new HttpHeaders());
        Patient patient = patientMapper.getById(patientId);
        final String reportName = patient.getFirstName() + "_" + patient.getLastName();
        headers.add("Content-Disposition", "attachment; filename=" + reportName + ".pdf");

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(ReportConstants.PARAM_PRINT_DATE, fillDate != null);
        parameters.put(ReportConstants.PARAM_DATE, fillDate);
        parameters.put(ReportConstants.PARAM_PRINT_NBR, fillNumber != null);
        parameters.put(ReportConstants.PARAM_NBR, fillNumber);
        parameters.put(ReportConstants.PARAM_USER, Doctor.builder()
                .code("AKM123").firstName("Vardiene").lastName("Pavardiene").occupation("Seimos gydytoja").build());

        try {
            byte[] reportData = reportGenerator
                    .generate("disability-report", parameters, Collections.singletonList(reportMapper
                            .getDisabilityReport(patientId)));
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
