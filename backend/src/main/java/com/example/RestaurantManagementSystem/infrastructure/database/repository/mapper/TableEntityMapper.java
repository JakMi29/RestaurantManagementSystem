package com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;

@Component
@AllArgsConstructor
public class TableEntityMapper {
    private final OrderEntityMapper orderEntityMapper;

    public Table map(TableEntity entity) {
        return Table.builder()
                .id(entity.getId())
                .name(entity.getName())
                .status(entity.getStatus())
                .active(entity.getActive())
                .orders(Optional.ofNullable(entity.getOrders())
                        .orElseGet(Collections::emptySet)
                        .stream()
                        .map(orderEntityMapper::map)
                        .toList())
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
                .active(table.getActive())
                .restaurant(
                        RestaurantEntity
                                .builder()
                                .id(table.getRestaurant().getId())
                                .name(table.getRestaurant().getName())
                                .build())
                .build();
    }

    public Table mapWithOrder(TableEntity entity) {
        return Table.builder()
                .id(entity.getId())
                .name(entity.getName())
                .status(entity.getStatus())
                .active(entity.getActive())
                .restaurant(
                        Restaurant
                                .builder()
                                .id(entity.getRestaurant().getId())
                                .name(entity.getRestaurant().getName())
                                .build())
                .build();
    }

    public TableEntity mapWithOrder(Table table) {
        return TableEntity.builder()
                .id(table.getId())
                .name(table.getName())
                .status(table.getStatus())
                .active(table.getActive())
                .restaurant(
                        RestaurantEntity
                                .builder()
                                .id(table.getRestaurant().getId())
                                .name(table.getRestaurant().getName())
                                .build())
                .build();
    }
}
