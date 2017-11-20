package controller;

import bean.*;
import constants.ReportConstants;
import lombok.extern.slf4j.Slf4j;
import mapper.DisabilityMapper;
import mapper.PatientMapper;
import mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import report.ReportGenerator;
import service.DisabilityService;
import service.PatientService;
import service.ReportService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Disability controller
 * Created by liutkvai on 6/27/2016.
 */
@RestController
@RequestMapping(value = "patient/{id}/disability")
@Slf4j
public class DisabilityController extends ControllerBase {

    @Autowired
    private DisabilityService disabilityService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private ReportService reportService;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @Transactional
    public DisabilityReport save(@RequestBody DisabilityReport disabilityReport) {
        return disabilityService.create(disabilityReport);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<ByteArrayResource> print(@PathVariable("id") int patientId,
            @RequestParam(value = "fillDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate fillDate,
            @RequestParam(value = "fillNumber", required = false) Integer fillNumber) {
        HttpHeaders headers = addHeaders(new HttpHeaders());
        Patient patient = patientService.get(patientId);
        final String reportName = patient.getFirstName() + "_" + patient.getLastName();
        headers.add("Content-Disposition", "attachment; filename=" + reportName + ".pdf");

        DisabilityReportParams disabilityReportParams = DisabilityReportParams.builder().fillDate(fillDate != null)
                .date(fillDate).fillNumber(fillNumber != null).number(fillNumber).patientId(patientId)
                .build();

        byte[] reportData = reportService.get(disabilityReportParams);
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(reportData.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(reportData));

    }
}
