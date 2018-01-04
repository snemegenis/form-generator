package mapper;

import bean.Patient;
import com.fasterxml.jackson.core.type.TypeReference;
import config.PersistenceConfig;
import config.PersistenceConfigForTest;
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
 * Created by liutkvai on 9/2/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceConfig.class, PersistenceConfigForTest.class })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class })
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class PatientMapperTest extends MapperTestBase {

    @Autowired
    private PatientMapper patientMapper;

    @Test
    public void testGetList() throws Exception {
        List<Patient> expected = readFromClassPath("/mapper/expected/patients.json",
                new TypeReference<List<Patient>>() {
                });

        List<Patient> actual = patientMapper.getList();
        assertListEquals(expected, actual);

    }

    @Test
    public void testAddPatient() throws Exception {
        Patient newPatient = readFromClassPath("/mapper/expected/new-patient.json", new TypeReference<Patient>() {
        });
        List<Patient> expected = readFromClassPath("/mapper/expected/patients.json",
                new TypeReference<List<Patient>>() {
                });
        expected.add(newPatient);

        patientMapper.add(newPatient);
        List<Patient> actual = patientMapper.getList();
        assertListEquals(expected, actual);

    }

    @Test
    public void testUpdatePatient() throws Exception {
        Patient newPatient = readFromClassPath("/mapper/expected/new-patient.json", new TypeReference<Patient>() {
        });
        newPatient.setId(1);
        List<Patient> expected = readFromClassPath("/mapper/expected/updated-patients.json",
                new TypeReference<List<Patient>>() {
                });

        patientMapper.update(newPatient);
        List<Patient> actual = patientMapper.getList();
        assertListEquals(expected, actual);

    }

    @Test
    public void testDeletePatient() throws Exception {
        List<Patient> expected = readFromClassPath("/mapper/expected/deleted-patients.json",
                new TypeReference<List<Patient>>() {
                });

        patientMapper.delete(1);
        List<Patient> actual = patientMapper.getList();
        assertListEquals(expected, actual);

    }

}
