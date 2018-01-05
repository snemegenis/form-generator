package util;

import exception.ValidationException;

import java.text.MessageFormat;

/**
 * Validation utility methods
 * Created by liutkvai on 11/21/2017.
 */
public final class ValidationHelper {
    ValidationHelper() {
    }

    /**
     * Validates required field.
     *
     * @param name  Field name.
     * @param value Value to check.
     * @param <T>   Any type.
     */
    public static final <T> void validateRequired(String name, T value) {
        if (value == null) {
            throw new ValidationException(name, "required value is missing");
        }
    }

    /**
     * Validates field value to match specified one.
     *
     * @param name  Field name.
     * @param value Value to check.
     * @param value Another Value to check.
     * @param <T>   Any type.
     */
    public static final <T> void validateEquals(String name, T value, T otherValue) {
        boolean result = value == null ? otherValue == null : value.equals(otherValue);
        if (!result) {
            throw new ValidationException(name,
                    MessageFormat.format("actual and specified values do not match: {0}<->{1}", value, otherValue));
        }
    }

}
