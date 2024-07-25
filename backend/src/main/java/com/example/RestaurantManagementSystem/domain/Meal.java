package com.example.RestaurantManagementSystem.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;

@Value
@With
@Builder
@EqualsAndHashCode
public class Meal {
    Integer id;
    String name;
    Category category;
    MealStatus status;
    BigDecimal price;
    String description;
    String image;
    boolean mealOfTheDay;
    Restaurant restaurant;
}
