package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WaitersDTO {
    WaiterDTO waiter;
    int totalCustomers;
    int totalOrders;
    int totalMeals;
    String totalIncome;
}
