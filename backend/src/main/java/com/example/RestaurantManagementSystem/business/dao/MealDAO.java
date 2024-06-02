package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Restaurant;

import java.util.List;

public interface MealDAO {
    Meal createMeal(Meal meal);
    List<Meal> findAllByRestaurant(Restaurant restaurant);

    List<Meal> findAllByRestaurantAndCategory(Restaurant restaurant, Category category);

    Meal findByNameAndRestaurant(String name, Restaurant restaurant);
}
