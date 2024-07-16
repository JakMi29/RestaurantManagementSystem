package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class OrderEntityMapper {
    private OrderMealEntityMapper orderMealEntityMapper;

    public Order map(OrderEntity entity) {
        return Order.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .number(entity.getNumber())
                .status(entity.getStatus())
                .receivedDateTime(entity.getReceivedDateTime())
                .completedDateTime(entity.getCompletedDateTime())
                .restaurant(
                        Restaurant.builder()
                                .id(entity.getRestaurant().getId())
                                .build())
                .waiter(
                        Waiter.builder()
                        .id(entity.getId()).build())
                .orderMeals(entity.getOrderMeals().stream().map(orderMealEntityMapper::map).toList())
                .build();
    }

    public OrderEntity map(Order order) {
        return OrderEntity.builder()
                .id(order.getId())
                .number(order.getNumber())
                .price(order.getPrice())
                .status(order.getStatus())
                .completedDateTime(order.getCompletedDateTime())
                .receivedDateTime(order.getReceivedDateTime())
                .restaurant(
                        RestaurantEntity.builder()
                                .id(order.getRestaurant().getId())
                                .build())
                .waiter(
                        WaiterEntity.builder()
                                .id(order.getId()).build())
                .orderMeals(order.getOrderMeals().stream().map(orderMealEntityMapper::map).collect(Collectors.toSet()))
                .build();
    }
}
