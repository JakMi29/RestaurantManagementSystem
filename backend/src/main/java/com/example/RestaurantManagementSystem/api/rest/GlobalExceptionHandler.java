package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.response.Response;
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

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Response> handleException(Exception ex) {
//        log.error(ex.getMessage());
//        String message = String.format("Other exception occurred: %s", ex.getMessage());
//        Response response = Response.builder()
//                .message("Something gone wrong!")
//                .code(HttpStatus.UNAUTHORIZED.value())
//                .build();
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//
//    @ExceptionHandler(BadCredentialsException.class)
//    public ResponseEntity<Response> handleException(BadCredentialsException ex) {
//        log.error(ex.getMessage());
//        String message = ex.getMessage();
//        Response response = Response.builder()
//                .message(message)
//                .code(HttpStatus.UNAUTHORIZED.value())
//                .build();
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//
//    @ExceptionHandler(ObjectAlreadyExist.class)
//    public ResponseEntity<Response> handleUserAlreadyExistException(Exception ex) {
//        String message = String.format(ex.getMessage());
//        Response response = Response.builder()
//                .message(message)
//                .code(HttpStatus.BAD_REQUEST.value())
//                .build();
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(NotFoundException.class)
//    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
//        log.error(ex.getMessage());
//        String message = String.format(ex.getMessage());
//        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(BindException.class)
//    public ResponseEntity<String> handleBindExceptionException(BindException ex) {
//        log.error(ex.getMessage());
//        String message = String.format("Bad request for field: %s, wrong value: %s",
//                Optional.ofNullable(ex.getFieldError()).map(FieldError::getField).orElse(null),
//                Optional.ofNullable(ex.getFieldError()).map(FieldError::getRejectedValue).orElse(null));
//        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
//    }
}
