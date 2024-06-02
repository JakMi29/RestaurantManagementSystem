package com.example.RestaurantManagementSystem.api.dto;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Restaurant;
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
    Category category;
    BigDecimal price;
    String description;
    byte[] image;
    boolean mealOfTheDay;
}
