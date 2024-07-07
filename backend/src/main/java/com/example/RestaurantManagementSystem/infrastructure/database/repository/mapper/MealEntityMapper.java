package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.RestaurantOwner;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantOwnerEntity;
import org.springframework.stereotype.Component;

@Component
public class MealEntityMapper {
    public Meal map(MealEntity entity){
        return Meal.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .mealOfTheDay(entity.getMealOfTheDay())
                .image(entity.getImage())
                .mealStatus(entity.getStatus())
                .restaurant(
                        Restaurant
                                .builder()
                                .id(entity.getRestaurant().getId())
                                .name(entity.getRestaurant().getName())
                                .build())
                .build();
    }
    public MealEntity map(Meal meal){
        return MealEntity.builder()
                .id(meal.getId())
                .name(meal.getName())
                .category(meal.getCategory())
                .status(meal.getMealStatus())
                .price(meal.getPrice())
                .description(meal.getDescription())
                .mealOfTheDay(meal.isMealOfTheDay())
                .image(meal.getImage())
                .restaurant(
                        RestaurantEntity
                                .builder()
                                .id(meal.getRestaurant().getId())
                                .name(meal.getRestaurant().getName())
                                .build())
                .build();
    }
}
