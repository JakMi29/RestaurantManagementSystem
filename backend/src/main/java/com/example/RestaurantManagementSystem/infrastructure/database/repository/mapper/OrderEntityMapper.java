package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;
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
                .table(
                        Table.builder()
                                .id(entity.getTable().getId())
                                .build())
                .restaurant(
                        Restaurant.builder()
                                .id(entity.getRestaurant().getId())
                                .build())
                .waiter(
                        Waiter.builder()
                                .id(entity.getWaiter().getId())
                                .email(entity.getWaiter().getEmail())
                                .build()
                )
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
                .table(
                        TableEntity.builder()
                                .id(order.getTable().getId())
                                .build())
                .restaurant(
                        RestaurantEntity.builder()
                                .id(order.getRestaurant().getId())
                                .build())
                .waiter(
                        WaiterEntity.builder()
                                .id(order.getWaiter().getId())
                                .build())
                .orderMeals(order.getOrderMeals().stream().map(orderMealEntityMapper::map).collect(Collectors.toSet()))
                .build();
    }
}
