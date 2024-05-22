package com.example.RestaurantManagementSystem.domain.exception;

public class UserAlreadyExist extends RuntimeException {

    public UserAlreadyExist(final String message) {
        super(message);
    }
}
