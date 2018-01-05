package mapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import liquibase.Liquibase;
import liquibase.integration.spring.SpringLiquibase;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.junit.After;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.List;

/**
 * Created by liutkvai on 7/21/2017.
 */
public abstract class MapperTestBase {

    @Autowired
    protected ObjectMapper mapper;

    protected <T> T readFromClassPath(String classpath, TypeReference<T> type) throws java.io.IOException {
        Resource report = new ClassPathResource(classpath);
        return mapper.readValue(report.getFile(), type);
    }

    protected <T> void assertListEquals(List<T> expected, List<T> actual) {
        Assert.assertEquals(expected.size(), actual.size());
        for (int i = 0; i < expected.size(); i++) {
            Assert.assertTrue(EqualsBuilder.reflectionEquals(expected.get(i), actual.get(i)));
        }
    }

}
