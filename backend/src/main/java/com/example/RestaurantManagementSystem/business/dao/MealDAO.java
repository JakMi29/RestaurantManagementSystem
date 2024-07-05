package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MealDAO {
    Meal createMeal(Meal meal);
    Meal updateMeal(Meal meal);
    List<Meal> findAllByRestaurant(Restaurant restaurant);

    Page<Meal> findAllByRestaurantAndCategoryAndStatusNot(
            Restaurant restaurant, Category category,  MealStatus mealStatus, Pageable pageable
    );

    Meal findByNameAndRestaurant(String name, Restaurant restaurant);

}
