package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.MealDTO;
import com.example.RestaurantManagementSystem.domain.Meal;
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
                .description(meal.getDescription())
                .mealOfTheDay(meal.isMealOfTheDay())
                .image(meal.getImage())
                .build();
    }

    public Meal mapOrderMeal(MealDTO meal) {
        return Meal.builder()
                .name(meal.getName())
                .price(meal.getPrice())
                .image(meal.getImage())
                .build();
    }

    public MealDTO mapOrderMeal(Meal meal) {
        return MealDTO.builder()
                .name(meal.getName())
                .price(meal.getPrice())
                .image(meal.getImage())
                .build();
    }
}
