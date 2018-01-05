package handler;

import bean.Error;
import exception.DisabilityException;
import exception.ValidationException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { AuthenticationException.class })
    public ResponseEntity<Error> handleError(AuthenticationException exc) {
        return error(-100, exc, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = { ValidationException.class })
    public ResponseEntity<Error> handleError(ValidationException exc) {
        return error(-10, exc, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { DisabilityException.class })
    public ResponseEntity<Error> handleError(DisabilityException exc) {
        return error(-2, exc, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = { Exception.class })
    public ResponseEntity<Error> handleError(Exception exc) {
        return error(-1, exc, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Error> error(int code, Exception exc, HttpStatus status) {
        log.error("Request failed with error", exc);
        Error body = Error.builder().code(code).message(exc.getMessage()).build();
        return new ResponseEntity<>(body, status);
    }

}
