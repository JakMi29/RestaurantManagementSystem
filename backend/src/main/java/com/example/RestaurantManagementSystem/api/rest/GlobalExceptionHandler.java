package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.response.ErrorResponse;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Optional;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error(ex.getMessage());
        String message = String.format("Other exception occurred: %s", ex.getMessage());
        ErrorResponse response=ErrorResponse.builder()
                .message(message)
                .code(HttpStatus.UNAUTHORIZED.toString())
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleException(BadCredentialsException ex) {
        log.error(ex.getMessage());
        String message ="Invalid email or password!";
        ErrorResponse response=ErrorResponse.builder()
                .message(message)
                .code("dupa")
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(ObjectAlreadyExist.class)
    public ResponseEntity<String> handleUserAlreadyExistException(Exception ex) {
        log.error(ex.getMessage());
        String message = String.format(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        log.error(ex.getMessage());
        String message = String.format(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<String> handleBindExceptionException(BindException ex) {
        log.error(ex.getMessage());
        String message = String.format("Bad request for field: %s, wrong value: %s",
                Optional.ofNullable(ex.getFieldError()).map(FieldError::getField).orElse(null),
                Optional.ofNullable(ex.getFieldError()).map(FieldError::getRejectedValue).orElse(null));
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
