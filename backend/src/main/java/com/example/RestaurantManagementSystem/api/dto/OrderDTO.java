package com.example.RestaurantManagementSystem.api.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDTO {
    String number;
    String status;
    WaiterDTO waiter;
    String tableName;
    String completedDateTime;
    String receivedDateTime;
    String durationTime;
    Boolean edit;
    WaiterDTO editor;
    BigDecimal price;
    Integer customerQuantity;
    List<OrderMealDTO> meals;
}
