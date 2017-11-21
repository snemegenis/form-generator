package util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

/**
 * Created by liutkvai on 11/21/2017.
 */
public final class JSONHelper {

    private JSONHelper() {
    }

    public static final <T> T readFromClassPath(ObjectMapper mapper, String classpath, TypeReference<T> type)
            throws java.io.IOException {
        Resource report = new ClassPathResource(classpath);
        return mapper.readValue(report.getFile(), type);
    }

    public static final <T> String writeAsString(ObjectMapper mapper, T data)
            throws java.io.IOException {
        return mapper.writeValueAsString(data);
    }

}
