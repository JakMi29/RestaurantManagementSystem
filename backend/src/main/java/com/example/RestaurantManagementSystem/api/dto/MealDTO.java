package com.example.RestaurantManagementSystem.api.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MealDTO {
    String name;
    String category;
    BigDecimal price;
    String description;
    String status;
    String image;
    boolean mealOfTheDay;
}
