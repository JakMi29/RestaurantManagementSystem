package com.example.RestaurantManagementSystem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WaitersStatisticsDTO {
    int totalCustomers;
    int totalOrders;
    int averageDailyCustomers;
    int averageDailyOrders;
    String totalPrice;
    String averageDailyPrice;
    DailyOrdersStatisticsDTO ordersStatisticsDTO;
    DailyMealsStatisticsDTO mealsStatisticsDTO;
}
