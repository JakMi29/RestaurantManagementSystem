package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TableDTOMapper {
    private final OrderDTOMapper orderDTOMapper;

    public TableDTO map(Table table) {
        return TableDTO.builder()
                .tableName(table.getName())
                .status(table.getStatus().toString())
                .order(table.getOrders().stream().map(orderDTOMapper::map).findFirst().orElse(null))
                .build();
    }

}
