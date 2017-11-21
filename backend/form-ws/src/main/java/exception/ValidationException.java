package exception;

import java.text.MessageFormat;

/**
 * Created by liutkvai on 11/21/2017.
 */
public class ValidationException extends RuntimeException {

    public ValidationException(String field, String message) {
        super(MessageFormat.format("\"{0}\" field validation failed: {1}", field, message));
    }
}
