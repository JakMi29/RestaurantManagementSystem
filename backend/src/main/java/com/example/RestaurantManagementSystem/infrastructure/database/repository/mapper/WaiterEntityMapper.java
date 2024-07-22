package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;
import org.springframework.stereotype.Component;

@Component
public class WaiterEntityMapper {
    public Waiter map(WaiterEntity entity) {
        return Waiter.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .restaurant(
                        Restaurant
                                .builder()
                                .id(entity.getRestaurant().getId())
                                .name(entity.getRestaurant().getName())
                                .build())
                .build();
    }

    public WaiterEntity map(Waiter waiter) {
        return WaiterEntity.builder()
                .id(waiter.getId())
                .email(waiter.getEmail())
                .restaurant(
                        RestaurantEntity
                                .builder()
                                .id(waiter.getRestaurant().getId())
                                .name(waiter.getRestaurant().getName())
                                .build())
                .build();
    }
}
