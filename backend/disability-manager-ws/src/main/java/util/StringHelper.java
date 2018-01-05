package util;

/**
 * Created by vaidelius on 16.6.19.
 */
public class StringHelper {

    public static final String padLeft(String data, int size, String prefix) {
        StringBuilder result = new StringBuilder(data);
        while (result.length() < size) {
            result.insert(0, prefix);
        }
        return result.toString();
    }

    public static final boolean isEmpty(String value) {
        return value == null || value.trim().length() == 0;
    }

    public static final String valueOrDefault(String value, String defaultValue) {
        return isEmpty(value) ? defaultValue : value;
    }

}
