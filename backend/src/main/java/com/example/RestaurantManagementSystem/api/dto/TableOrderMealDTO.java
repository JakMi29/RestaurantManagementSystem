package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TableOrderMealDTO {
    String time;
    String mealName;
    String mealPrice;
    Integer quantity;
    String totalPrice;
}
