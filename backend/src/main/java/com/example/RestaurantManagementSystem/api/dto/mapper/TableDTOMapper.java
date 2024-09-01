package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class TableDTOMapper {
    private final OrderDTOMapper orderDTOMapper;

    public TableDTO map(Table table) {
        return TableDTO.builder()
                .name(table.getName())
                .status(table.getStatus().toString())
                .order(Optional.ofNullable(table.getOrders())
                        .map(orders -> orders.stream().map(order -> orderDTOMapper.map(order, false)).findFirst().orElse(null))
                        .orElse(null))
                .build();
    }

}
