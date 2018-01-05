package report;

import java.util.Collection;
import java.util.Map;

/**
 * Created by liutkvai on 6/27/2016.
 */
public interface ReportGenerator {
	byte[] generate(String report, Map<String, Object> parameters, Collection<?> data) throws Exception;
}
