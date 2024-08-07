package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealDTO {
    String name;
    String category;
    String price;
    String description;
    String status;
    String image;
    boolean mealOfTheDay;
}
