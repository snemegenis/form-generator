package mapper;

import bean.DisabilityReport;
import com.fasterxml.jackson.core.type.TypeReference;
import config.PersistenceConfig;
import config.PersistenceConfigForTest;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import java.util.Collections;

/**
 * Created by liutkvai on 8/31/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {PersistenceConfig.class, PersistenceConfigForTest.class})
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class DisabilityMapperTest extends MapperTestBase {

    @Autowired
    private DisabilityMapper disabilityMapper;

    @Test
    public void testAddDisability() throws Exception {
        DisabilityReport disabilityReport = readFromClassPath("/mapper/expected/new-disability-report.json",
                new TypeReference<DisabilityReport>() {
                });
        disabilityMapper.add(disabilityReport);
        disabilityMapper.assignTreatments(disabilityReport.getId(), disabilityReport.getTreatments());
        disabilityMapper.assignAppointments(disabilityReport.getId(), disabilityReport.getAppointments());
        disabilityMapper.assignDiagnosis(disabilityReport.getId(),
                Collections.singletonList(disabilityReport.getMainDiagnosis()));
        disabilityMapper.assignDiagnosis(disabilityReport.getId(), disabilityReport.getOtherDiagnosis());
        disabilityMapper.assignDisabilities(disabilityReport.getId(), disabilityReport.getDisabilityTypes());

        EqualsBuilder.reflectionEquals(readFromClassPath("/mapper/expected/new-disability-report.json",
                new TypeReference<DisabilityReport>() {
                }), disabilityReport);

    }

    @Test
    public void testUpdateDisability() throws Exception {
        DisabilityReport disabilityReport = readFromClassPath("/mapper/expected/updated-disability-report.json",
                new TypeReference<DisabilityReport>() {
                });
        disabilityMapper.update(disabilityReport);
        disabilityMapper.removeTreatments(disabilityReport.getId());
        disabilityMapper.assignTreatments(disabilityReport.getId(), disabilityReport.getTreatments());
        disabilityMapper.removeAppointments(disabilityReport.getId());
        disabilityMapper.assignAppointments(disabilityReport.getId(), disabilityReport.getAppointments());
        disabilityMapper.removeDiagnosis(disabilityReport.getId());
        disabilityMapper.assignDiagnosis(disabilityReport.getId(),
                Collections.singletonList(disabilityReport.getMainDiagnosis()));
        disabilityMapper.assignDiagnosis(disabilityReport.getId(), disabilityReport.getOtherDiagnosis());
        disabilityMapper.removeDisabilities(disabilityReport.getId());
        disabilityMapper.assignDisabilities(disabilityReport.getId(), disabilityReport.getDisabilityTypes());

        EqualsBuilder.reflectionEquals(readFromClassPath("/mapper/expected/updated-disability-report.json",
                new TypeReference<DisabilityReport>() {
                }), disabilityReport);

    }


    @Test
    public void testGetDisability() throws Exception {
        Assert.assertNull(disabilityMapper.getByStatusFlag(1, false));
        Assert.assertNull(disabilityMapper.getByStatusFlag(2, true));
        Assert.assertNotNull(disabilityMapper.getByStatusFlag(1, true));
    }


}
