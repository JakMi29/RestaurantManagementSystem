package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.RestaurantOwner;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantOwnerEntity;
import org.springframework.stereotype.Component;

@Component
public class RestaurantOwnerMapper {
    public RestaurantOwner map(RestaurantOwnerEntity entity) {
        return RestaurantOwner.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .build();
    }

    public RestaurantOwnerEntity map(RestaurantOwner restaurantOwner) {
        return RestaurantOwnerEntity.builder()
                .id(restaurantOwner.getId())
                .email(restaurantOwner.getEmail())
                .build();
    }
}
