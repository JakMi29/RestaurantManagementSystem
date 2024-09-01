package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Comparator;
import java.util.Optional;
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
                .edit(entity.getEdit())
                .receivedDateTime(entity.getReceivedDateTime())
                .customerQuantity(entity.getCustomerQuantity())
                .completedDateTime(entity.getCompletedDateTime())
                .editor(entity.getEditor() == null ? null : Waiter.builder()
                        .id(entity.getEditor().getId())
                        .email(entity.getEditor().getEmail())
                        .build())
                .table(
                        Table.builder()
                                .id(entity.getTable().getId())
                                .name(entity.getTable().getName())
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
                .orderMeals(
                        entity.getOrderMeals().stream()
                                .map(orderMealEntityMapper::map)
                                .toList()
                )
                .build();
    }

    public OrderEntity map(Order order) {
        return OrderEntity.builder()
                .id(order.getId())
                .number(order.getNumber())
                .price(order.getPrice())
                .status(order.getStatus())
                .edit(order.getEdit())
                .completedDateTime(order.getCompletedDateTime())
                .receivedDateTime(order.getReceivedDateTime())
                .customerQuantity(order.getCustomerQuantity())
                .table(
                        TableEntity.builder()
                                .id(order.getTable().getId())
                                .name(order.getTable().getName())
                                .build())
                .restaurant(
                        RestaurantEntity.builder()
                                .id(order.getRestaurant().getId())
                                .build())
                .waiter(
                        WaiterEntity.builder()
                                .id(order.getWaiter().getId())
                                .build())
                .editor(order.getEditor() == null ? null :
                        WaiterEntity.builder()
                                .id(order.getEditor().getId())
                                .email(order.getEditor().getEmail())
                                .build())
                .orderMeals(Optional.ofNullable(order.getOrderMeals())
                        .orElseGet(Collections::emptyList).
                        stream().map(orderMealEntityMapper::map)
                        .collect(Collectors.toSet()))
                .build();
    }

}
