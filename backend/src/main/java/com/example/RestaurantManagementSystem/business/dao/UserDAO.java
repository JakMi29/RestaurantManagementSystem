package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.User;

import java.util.Optional;

public interface UserDAO {
    Optional<User> findByEmail(String email);

    User updateUser(User user);
}
