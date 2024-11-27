package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class OrderEntityMapper {
    private OrderMealEntityMapper orderMealEntityMapper;
    private WaiterEntityMapper waiterEntityMapper;

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
                .editor(Optional.ofNullable(entity.getEditor())
                        .map(waiterEntityMapper::map)
                        .orElse(null))
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
                        waiterEntityMapper.map(entity.getWaiter())
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
                        waiterEntityMapper.map(order.getWaiter()))
                .editor(Optional.ofNullable(order.getEditor())
                        .map(waiterEntityMapper::map)
                        .orElse(null))
                .orderMeals(Optional.ofNullable(order.getOrderMeals())
                        .orElseGet(Collections::emptyList).
                        stream().map(orderMealEntityMapper::map)
                        .collect(Collectors.toSet()))
                .build();
    }
}
