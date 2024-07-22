package com.example.RestaurantManagementSystem.domain;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Value
@With
@Builder
@EqualsAndHashCode
public class OrderMeal {
    Integer id;
    Integer quantity;
    OrderMealStatus status;
    OffsetDateTime receivedDateTime;
    OffsetDateTime completedDateTime;
    Meal meal;
    BigDecimal price;
    Order Order;
}
