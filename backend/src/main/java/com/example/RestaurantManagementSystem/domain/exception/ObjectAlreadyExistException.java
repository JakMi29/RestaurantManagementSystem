package com.example.RestaurantManagementSystem.domain.exception;

public class ObjectAlreadyExistException extends RuntimeException {

    public ObjectAlreadyExistException(final String message) {
        super(message);
    }
}
