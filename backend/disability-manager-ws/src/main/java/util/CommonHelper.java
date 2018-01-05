package util;

/**
 * Created by vaidelius on 16.7.3.
 */
public abstract class CommonHelper {
     public static final <T> T valueOrDefault(T value, T defaultVal) {
        return value == null ? defaultVal : value;
     }
}
