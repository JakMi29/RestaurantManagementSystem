package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.RestaurantOwner;

public interface RestaurantOwnerDAO {
    RestaurantOwner createRestaurantOwner(String email);
}
