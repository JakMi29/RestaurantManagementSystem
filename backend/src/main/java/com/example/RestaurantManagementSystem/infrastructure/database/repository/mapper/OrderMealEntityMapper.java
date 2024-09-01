package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderMealEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMealEntityMapper {
    private final MealEntityMapper mealEntityMapper;

    public OrderMeal map(OrderMealEntity entity) {
        return OrderMeal.builder()
                .id(entity.getId())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .status(entity.getStatus())
                .receivedDateTime(entity.getReceivedDateTime())
                .completedDateTime(entity.getCompletedDateTime())
                .order(Order.builder()
                        .id(entity.getOrder().getId())
                        .build())
                .meal(mealEntityMapper.map(entity.getMeal()))
                .build();
    }

    public OrderMealEntity map(OrderMeal orderMeal) {
        return OrderMealEntity.builder()
                .id(orderMeal.getId())
                .quantity(orderMeal.getQuantity())
                .price(orderMeal.getPrice())
                .status(orderMeal.getStatus())
                .receivedDateTime(orderMeal.getReceivedDateTime())
                .completedDateTime(orderMeal.getCompletedDateTime())
                .order(OrderEntity.builder()
                        .id(orderMeal.getOrder().getId())
                        .build())
                .meal(
                        MealEntity.builder()
                                .id(orderMeal.getMeal().getId())
                                .name(orderMeal.getMeal().getName())
                                .build())
                .build();
    }
}
