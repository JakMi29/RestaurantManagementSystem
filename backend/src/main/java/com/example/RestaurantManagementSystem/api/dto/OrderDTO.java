package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    String price;
    Integer customerQuantity;
    List<OrderMealDTO> meals;
}
