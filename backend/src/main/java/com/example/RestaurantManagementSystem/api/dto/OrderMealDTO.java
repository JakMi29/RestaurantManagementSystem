package com.example.RestaurantManagementSystem.api.dto;

import com.example.RestaurantManagementSystem.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderMealDTO {
    String price;
    MealDTO meal;
    Integer quantity;
    String status;
}
