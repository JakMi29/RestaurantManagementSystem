package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.MealDTO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import org.springframework.stereotype.Component;

@Component
public class MealDTOMapper {
    public MealDTO map(Meal meal) {
        return MealDTO.builder()
                .name(meal.getName())
                .category(meal.getCategory().toString())
                .price(meal.getPrice())
                .description(meal.getDescription())
                .mealOfTheDay(meal.isMealOfTheDay())
                .image(meal.getImage())
                .status(meal.getStatus().toString())
                .build();
    }

    public Meal map(MealDTO meal) {
        return Meal.builder()
                .name(meal.getName())
                .category(Category.valueOf(meal.getCategory()))
                .price(meal.getPrice())
                .description(meal.getDescription())
                .mealOfTheDay(meal.isMealOfTheDay())
                .image(meal.getImage())
                .status(MealStatus.valueOf(meal.getStatus()))
                .build();
    }
}
