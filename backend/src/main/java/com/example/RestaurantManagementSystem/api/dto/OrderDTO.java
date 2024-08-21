package com.example.RestaurantManagementSystem.api.dto;

import com.example.RestaurantManagementSystem.domain.Waiter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    String number;
    String status;
    WaiterDTO waiter;
    String tableName;
    Boolean edit;
    WaiterDTO editor;
    BigDecimal price;
    Integer customerQuantity;
    List<OrderMealDTO> meals;
}
