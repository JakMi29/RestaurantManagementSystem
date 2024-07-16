package com.example.RestaurantManagementSystem.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Value
@With
@Builder
@EqualsAndHashCode
public class Order {
    Integer id;
    BigDecimal price;
    String number;
    OrderStatus status;
    OffsetDateTime completedDateTime;
    OffsetDateTime receivedDateTime;
    Restaurant restaurant;
    Table table;
    Waiter waiter;
    List<OrderMeal> orderMeals;
}
