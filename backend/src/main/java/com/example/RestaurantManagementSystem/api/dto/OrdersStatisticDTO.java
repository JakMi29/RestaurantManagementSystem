package com.example.RestaurantManagementSystem.api.dto;

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
public class OrdersStatisticDTO {
    BigDecimal averageIncome;
    BigDecimal totalIncome;
    Integer totalCustomers;
    Integer averageCustomers;
    List<DailyOrdersStatisticsDTO> dailyStatistics;
}
