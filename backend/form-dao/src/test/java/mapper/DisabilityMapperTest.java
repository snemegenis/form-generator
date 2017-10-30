package mapper;

import bean.DisabilityReport;
import bean.Doctor;
import bean.Patient;
import com.fasterxml.jackson.core.type.TypeReference;
import config.PersistenceConfig;
import config.PersistenceConfigForTest;
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

import java.util.List;

/**
 * Created by liutkvai on 8/31/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceConfig.class, PersistenceConfigForTest.class })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class, TransactionalTestExecutionListener.class })
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class DisabilityMapperTest extends MapperTestBase{

    @Autowired
    private DisabilityMapper disabilityMapper;

    @Test
    public void testAddDisability() throws Exception {
        DisabilityReport disabilityReport = readFromClassPath("/mapper/expected/new-disability-report.json",
                new TypeReference<DisabilityReport>() {
                });
        disabilityMapper.add(disabilityReport);
        disabilityMapper.assignTreatments(disabilityReport);
        disabilityMapper.assignAppointments(disabilityReport);
        Assert.assertEquals(Integer.valueOf(2), disabilityReport.getId());

    }

}
