package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Waiter;
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

    public Waiter mapWithUserAndOrders(WaiterEntity entity) {
        return Waiter.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .user(userMapper.map(entity.getUser()))
                .salary(entity.getSalary())
                .employmentDate(entity.getEmploymentDate())
                .build();
    }
}
