package util;

import org.springframework.boot.test.json.JacksonTester;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

/**
 * Created by liutkvai on 11/21/2017.
 */
public final class JSONHelper {

    private JSONHelper() {}

    public static final <T> T read(String classPath, JacksonTester<T> jacksonTester) throws IOException{
        Resource resource = new ClassPathResource(classPath);
        return jacksonTester.read(resource).getObject();
    }
}
