package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class WaiterEntityMapper {
    private final UserEntityMapper userMapper;

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

    public WaiterEntity mapWithUserAndOrders(Waiter waiter) {
        return WaiterEntity.builder()
                .id(waiter.getId())
                .email(waiter.getEmail())
                .user(userMapper.map(waiter.getUser()))
                .restaurant(RestaurantEntity.builder()
                        .id(waiter.getRestaurant().getId())
                        .build())
                .salary(waiter.getSalary())
                .employmentDate(waiter.getEmploymentDate())
                .build();
    }

    public Waiter mapWithUserAndOrders(WaiterEntity entity) {
        return Waiter.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .user(userMapper.map(entity.getUser()))
                .restaurant(Restaurant.builder()
                        .id(entity.getRestaurant().getId())
                        .build())
                .salary(entity.getSalary())
                .employmentDate(entity.getEmploymentDate())
                .build();
    }
}
