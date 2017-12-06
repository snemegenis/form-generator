package handler;

import bean.Error;
import exception.ValidationException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Created by liutkvai on 11/20/2017.
 */
@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { AuthenticationException.class })
    public ResponseEntity<Error> handleError(AuthenticationException exc) {
        return error(-100, exc.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = { ValidationException.class })
    public ResponseEntity<Error> handleError(ValidationException exc) {
        return error(-10, exc.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { Exception.class })
    public ResponseEntity<Error> handleError(Exception exc) {
        return error(-1, exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Error> error(int code, String message, HttpStatus status) {
        Error body = Error.builder().code(code).message(message).build();
        return new ResponseEntity<>(body, status);
    }

}
