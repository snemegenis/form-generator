package mapper;

import bean.DisabilityReport;
import bean.DisabilityReportTmp;
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

import java.io.*;

/**
 * Created by liutkvai on 8/31/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceConfig.class, PersistenceConfigForTest.class })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class })
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class DisabilityMapperTmpTest extends MapperTestBase {

    @Autowired
    private DisabilityTmpMapper disabilityTmpMapper;

    @Test
    public void testAddDisability() throws Exception {
        DisabilityReport report = readFromClassPath("/mapper/expected/disability-report.json",
                new TypeReference<DisabilityReport>() {
                });

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(bos)) {
                oos.writeObject(report);
            }
            disabilityTmpMapper.add(new DisabilityReportTmp(1, bos.toByteArray()));
        }

        DisabilityReportTmp disabilityReportTmp = disabilityTmpMapper.get(1);
        assertReport(report, disabilityReportTmp);
    }

    @Test
    public void testDeleteDisability() throws Exception {
        DisabilityReport report = readFromClassPath("/mapper/expected/disability-report.json",
                new TypeReference<DisabilityReport>() {
                });

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(bos)) {
                oos.writeObject(report);
            }
            disabilityTmpMapper.add(new DisabilityReportTmp(1, bos.toByteArray()));
        }

        disabilityTmpMapper.delete(1);

        Assert.assertNull(disabilityTmpMapper.get(1));
    }

    @Test
    public void testUpdateDisability() throws Exception {
        Assert.assertEquals(0, disabilityTmpMapper.update(1, new byte[0]));

        DisabilityReport report = readFromClassPath("/mapper/expected/disability-report.json",
                new TypeReference<DisabilityReport>() {
                });

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(bos)) {
                oos.writeObject(report);
            }
            disabilityTmpMapper.add(new DisabilityReportTmp(1, bos.toByteArray()));
        }

        report = readFromClassPath("/mapper/expected/new-disability-report.json",
                new TypeReference<DisabilityReport>() {
                });

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(bos)) {
                oos.writeObject(report);
            }
            Assert.assertEquals(1, disabilityTmpMapper.update(1, bos.toByteArray()));
        }

        DisabilityReportTmp disabilityReportTmp = disabilityTmpMapper.get(1);
        assertReport(report, disabilityReportTmp);
    }

    private void assertReport(DisabilityReport report, DisabilityReportTmp disabilityReportTmp)
            throws IOException, ClassNotFoundException {
        if (disabilityReportTmp != null) {
            try (ByteArrayInputStream bis = new ByteArrayInputStream(disabilityReportTmp.getData())) {
                try (ObjectInputStream ois = new ObjectInputStream(bis)) {
                    DisabilityReport actual = (DisabilityReport) ois.readObject();
                    EqualsBuilder.reflectionEquals(report, actual);
                }
            }
        }
    }

}
