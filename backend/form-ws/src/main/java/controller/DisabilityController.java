package controller;

import bean.*;
import exception.DisabilityException;
import exception.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import service.DisabilityService;
import service.DisabilityTmpService;
import service.PatientService;
import service.ReportService;
import util.ValidationHelper;

import java.time.LocalDate;

import static constants.RequestConstants.*;

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
    private DisabilityTmpService disabilityTmpService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private ReportService reportService;

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType
            .APPLICATION_JSON_VALUE)
    @ResponseBody
    public DisabilityReport save(@RequestBody DisabilityReport disabilityReport) {
        if (!disabilityReport.isValid()) {
            throw new ValidationException("disabilityReport", "Disability report should be valid");
        }
        return disabilityService.save(disabilityReport);
    }

    @RequestMapping(value = "tmp", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces
            = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public DisabilityReport saveTmp(@PathVariable("id") Integer patientId,
            @RequestBody DisabilityReport disabilityReport) {

        ValidationHelper.validateRequired("disabilityReport", disabilityReport);
        ValidationHelper.validateEquals("disabilityReport.patientId", disabilityReport.getPatientId(), patientId);

        disabilityTmpService.save(disabilityReport);
        return disabilityReport;
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<ByteArrayResource> print(@PathVariable("id") int patientId,
            @RequestParam(value = REQUEST_PARAM_FILL_DATE, required = false) @DateTimeFormat(iso = DateTimeFormat.ISO
                    .DATE) LocalDate fillDate,
            @RequestParam(value = REQUEST_PARAM_FILL_NUMBER, required = false) Integer fillNumber) {
        HttpHeaders headers = addHeaders(new HttpHeaders());
        Patient patient = patientService.get(patientId);
        final String reportName = patient.getFirstName() + "_" + patient.getLastName();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + reportName + ".pdf");

        DisabilityReportParams disabilityReportParams = DisabilityReportParams.builder()
                .fillDate(fillDate != null)
                .date(fillDate)
                .fillNumber(fillNumber != null)
                .number(fillNumber)
                .patientId(patientId)
                .build();

        byte[] reportData = reportService.get(disabilityReportParams);
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(reportData.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new ByteArrayResource(reportData));

    }

    @RequestMapping(value = "{disabilityReportId}", method = RequestMethod.GET, produces = MediaType
            .APPLICATION_JSON_VALUE)
    @ResponseBody
    public DisabilityReport getDisabilityReport(@PathVariable("disabilityReportId") Integer disabilityReportId) {
        return reportService.get(disabilityReportId);
    }

    @RequestMapping(value = "tmp", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public DisabilityReport getDisabilityReportTmp(@PathVariable("id") Integer patientId) {
        return disabilityTmpService.get(patientId);
    }

}
