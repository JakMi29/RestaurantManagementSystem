package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.stereotype.Component;

@Component
public class MealEntityMapper {
    public Meal map(MealEntity entity) {
        return Meal.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .mealOfTheDay(entity.getMealOfTheDay())
                .image(entity.getImage())
                .status(entity.getStatus())
                .restaurant(Restaurant.builder()
                        .id(entity.getRestaurant().getId())
                        .build())
                .build();
    }

    public MealEntity map(Meal meal) {
        return MealEntity.builder()
                .id(meal.getId())
                .name(meal.getName())
                .category(meal.getCategory())
                .status(meal.getStatus())
                .price(meal.getPrice())
                .description(meal.getDescription())
                .mealOfTheDay(meal.isMealOfTheDay())
                .image(meal.getImage())
                .restaurant(RestaurantEntity.builder()
                        .id(meal.getRestaurant().getId())
                        .build())
                .build();
    }
}
