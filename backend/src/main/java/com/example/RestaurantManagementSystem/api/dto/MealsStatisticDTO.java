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
public class MealsStatisticDTO {
    Integer averageDailySoldMeals;
    Integer totalSoldMeals;
    Integer averageMealsPerOrder;
    String averagePrepareMealTime;
    List<Top5MealsDTO> mostSalesMeal;
    List<Top5MealsDTO> highestIncomeMeal;
    List<DailyMealsStatisticsDTO> dailyStatistics;
}
