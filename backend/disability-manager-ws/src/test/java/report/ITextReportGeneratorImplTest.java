package report;

import bean.DisabilityReport;
import bean.Doctor;
import com.fasterxml.jackson.databind.ObjectMapper;
import config.ApplicationConfig;
import config.ConfigForTest;
import constants.ReportConstants;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by vaidelius on 16.9.4.
 */
@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class, ConfigForTest.class})
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class})
public class ITextReportGeneratorImplTest {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    @Qualifier("ITextReportGenerator")
    private ReportGenerator reportGenerator;

    @Test
    public void testGenerate() throws Exception {
        DisabilityReport inputData = readFromClassPath("/report/data/disability-report.json", DisabilityReport.class);
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(ReportConstants.PARAM_PRINT_DATE, false);
        parameters.put(ReportConstants.PARAM_DATE, LocalDate.of(2016, Month.SEPTEMBER, 4));
        parameters.put(ReportConstants.PARAM_PRINT_NBR, false);
        parameters.put(ReportConstants.PARAM_USER, Doctor.builder()
                .code("AKM123").firstName("Ona Laimute").lastName("Liutkiene").occupation("Seimos gydytoja").build());

        byte[] report = reportGenerator.generate(ReportConstants.DISABILITY_REPORT_CODE, parameters,
                Collections.singleton(inputData));
        String filePath = Files.createTempDirectory("form-generator").toString();
        log.info(filePath);
        Files.write(Paths.get(filePath, "disability-report.pdf"), report);
    }

    private <T> T readFromClassPath(String classpath, Class<T> clazz) throws java.io.IOException {
        Resource report = new ClassPathResource(classpath);
        return mapper.readValue(report.getFile(), clazz);
    }

}