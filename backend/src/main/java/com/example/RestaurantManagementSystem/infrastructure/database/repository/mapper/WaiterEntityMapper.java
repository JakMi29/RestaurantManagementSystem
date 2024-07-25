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
                .build();
    }

    public WaiterEntity map(Waiter waiter) {
        return WaiterEntity.builder()
                .id(waiter.getId())
                .email(waiter.getEmail())
                .build();
    }
}
