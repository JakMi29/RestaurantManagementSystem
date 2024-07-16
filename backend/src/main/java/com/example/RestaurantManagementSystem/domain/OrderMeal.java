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
public class OrderMeal {
    Integer id;
    Integer quantity;
    OrderMealStatus status;
    Meal meal;
    BigDecimal price;
    Order Order;
}
