package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealDTO {
    String name;
    String category;
    BigDecimal price;
    String description;
    String status;
    String image;
    boolean mealOfTheDay;
}
