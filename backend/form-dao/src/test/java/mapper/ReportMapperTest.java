package mapper;

import bean.DisabilityReport;
import bean.Treatment;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import config.PersistenceConfig;
import config.PersistenceConfigForTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.unitils.reflectionassert.ReflectionAssert;

/**
 * Created by liutkvai on 9/2/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceConfig.class, PersistenceConfigForTest.class })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class, TransactionalTestExecutionListener.class })
public class ReportMapperTest extends MapperTestBase{

    @Autowired
    private ReportMapper reportMapper;

    @Test
    public void testGetList() throws Exception {

        DisabilityReport expected = readFromClassPath("/mapper/expected/disability-report.json",
                new TypeReference<DisabilityReport>() {});
        DisabilityReport actual = reportMapper.getDisabilityReport(1);
        ReflectionAssert.assertReflectionEquals(expected, actual);
    }

}
