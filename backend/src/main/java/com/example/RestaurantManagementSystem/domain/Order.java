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
    Boolean edit;
    Integer customerQuantity;
    Table table;
    Waiter waiter;
    Waiter editor;
    List<OrderMeal> orderMeals;
}
