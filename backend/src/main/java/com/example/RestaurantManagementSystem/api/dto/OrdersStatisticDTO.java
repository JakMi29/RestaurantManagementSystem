package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrdersStatisticDTO {
    BigDecimal totalIncome;
    BigDecimal averageDailyIncome;
    BigDecimal averageOrderIncome;
    Duration averageOrderDuration;
    Integer totalCustomers;
    Integer averageCustomersPerDay;
    Integer averageCustomersPerOrder;
    Integer totalOrders;
    Integer averageOrdersPerDay;
    Integer averageMealPerOrder;
    List<DailyOrdersStatisticsDTO> dailyStatistics;
}
