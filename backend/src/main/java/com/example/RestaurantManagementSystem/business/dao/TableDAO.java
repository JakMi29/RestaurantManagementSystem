package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;

import java.util.List;

public interface TableDAO {
    Table createMeal(Table table);

    List<Table> findAllByRestaurant(Restaurant restaurant);
}

