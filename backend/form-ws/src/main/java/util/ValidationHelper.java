package util;

import exception.ValidationException;

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
}
