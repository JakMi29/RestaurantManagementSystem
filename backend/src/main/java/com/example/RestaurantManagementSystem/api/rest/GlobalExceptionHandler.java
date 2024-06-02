package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Optional;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        String message = String.format("Other exception occurred: %s", ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleException(BadCredentialsException ex) {
        String message ="Invalid email or password!";
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ObjectAlreadyExist.class)
    public ResponseEntity<String> handleUserAlreadyExistException(Exception ex) {
        String message = String.format(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        String message = String.format(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<String> handleBindExceptionException(BindException ex) {
        String message = String.format("Bad request for field: %s, wrong value: %s",
                Optional.ofNullable(ex.getFieldError()).map(FieldError::getField).orElse(null),
                Optional.ofNullable(ex.getFieldError()).map(FieldError::getRejectedValue).orElse(null));
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
