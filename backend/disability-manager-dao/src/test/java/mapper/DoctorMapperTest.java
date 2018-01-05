package mapper;

import bean.Doctor;
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
public class DoctorMapperTest {

    @Autowired
    private DoctorMapper doctorMapper;

    @Test
    public void testGetAllDoctors() throws Exception {
        List<Doctor> doctorList = doctorMapper.getDoctorList();
        Assert.assertEquals(1, doctorList.size());

    }

    @Test
    public void testGetByUserName() throws Exception {
        Doctor doctor = doctorMapper.getByCode("AKM-123");
        Assert.assertEquals("Jonas", doctor.getFirstName());

    }

}
