package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;

import java.util.List;

public interface MealDAO {
    Meal createMeal(Meal meal);
    Meal updateMeal(Meal meal);
    List<Meal> findAllByRestaurant(Restaurant restaurant);

    List<Meal> findAllByRestaurantAndCategoryAndStatusNot(Restaurant restaurant, Category category,  MealStatus mealStatus);

    Meal findByNameAndRestaurant(String name, Restaurant restaurant);

}
