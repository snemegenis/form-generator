package mapper;

import bean.User;
import com.fasterxml.jackson.core.type.TypeReference;
import config.PersistenceConfig;
import config.PersistenceConfigForTest;
import org.apache.commons.lang.builder.EqualsBuilder;
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
import static org.junit.Assert.*;

/**
 * Created by liutkvai on 12/1/2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceConfig.class, PersistenceConfigForTest.class })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class, TransactionalTestExecutionListener.class })
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserMapperTest extends MapperTestBase{

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testGetByUsername() throws Exception {
        User expected = readFromClassPath("/mapper/expected/user.json", new TypeReference<User>() {});
        User actual = userMapper.getByUsername("jonas@gmail.com");
        assertTrue(EqualsBuilder.reflectionEquals(expected, actual, new String[]{"doctor", "credentials"}));
        assertTrue(EqualsBuilder.reflectionEquals(expected.getDoctor(), actual.getDoctor()));
        assertTrue(EqualsBuilder.reflectionEquals(expected.getCredentials(), actual.getCredentials()));
    }
}