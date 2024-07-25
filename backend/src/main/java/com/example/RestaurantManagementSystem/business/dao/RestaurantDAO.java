package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Restaurant;

public interface RestaurantDAO {
    Restaurant createRestaurant(Restaurant restaurant);

    Restaurant findByName(String name);
}
