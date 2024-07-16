package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.stereotype.Component;

@Component
public class TableEntityMapper {
    public Table map(TableEntity entity) {
        return Table.builder()
                .id(entity.getId())
                .name(entity.getName())
                .status(entity.getStatus())
                .restaurant(
                        Restaurant
                                .builder()
                                .id(entity.getRestaurant().getId())
                                .name(entity.getRestaurant().getName())
                                .build())
                .build();
    }

    public TableEntity map(Table table) {
        return TableEntity.builder()
                .id(table.getId())
                .name(table.getName())
                .status(table.getStatus())
                .restaurant(
                        RestaurantEntity
                                .builder()
                                .id(table.getRestaurant().getId())
                                .name(table.getRestaurant().getName())
                                .build())
                .build();
    }
}
