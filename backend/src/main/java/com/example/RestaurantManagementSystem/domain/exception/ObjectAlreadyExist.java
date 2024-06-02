package com.example.RestaurantManagementSystem.domain.exception;

public class ObjectAlreadyExist extends RuntimeException {

    public ObjectAlreadyExist(final String message) {
        super(message);
    }
}
