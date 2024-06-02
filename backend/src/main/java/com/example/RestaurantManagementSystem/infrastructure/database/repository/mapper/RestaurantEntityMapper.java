package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.RestaurantOwner;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantOwnerEntity;
import org.springframework.stereotype.Component;

@Component
public class RestaurantEntityMapper {
    public Restaurant map(RestaurantEntity entity){
        return Restaurant.builder()
                .id(entity.getId())
                .name(entity.getName())
                .restaurantOwner(
                        RestaurantOwner
                                .builder()
                                .id(entity.getRestaurantOwner().getId())
                                .email(entity.getRestaurantOwner().getEmail())
                                .build())
                .build();
    }
    public RestaurantEntity map(Restaurant restaurant){
        return RestaurantEntity.builder()
                .name(restaurant.getName())
                .id(restaurant.getId())
                .restaurantOwner(
                        RestaurantOwnerEntity
                                .builder()
                                .id(restaurant.getRestaurantOwner().getId())
                                .email(restaurant.getRestaurantOwner().getEmail())
                                .build())
                .build();
    }
}
