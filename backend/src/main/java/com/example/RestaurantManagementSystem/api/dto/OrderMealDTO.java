package com.example.RestaurantManagementSystem.api.dto;

import com.example.RestaurantManagementSystem.domain.Category;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderMealDTO {
    String price;
    MealDTO meal;
    Integer quantity;
    String status;
}
