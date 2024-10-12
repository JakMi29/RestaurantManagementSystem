package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.time.Duration;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
public class DailyMealsStatistics {
    private int totalQuantity;
    private Duration totalTime;
    private Map<LocalDate, DailyMealStatistics> dailyMealStatistics;

    public DailyMealsStatistics(OffsetDateTime startDate, OffsetDateTime endDate) {
        dailyMealStatistics = new HashMap<>();
        LocalDate currentDate = endDate.toLocalDate();
        while (!currentDate.isBefore(startDate.toLocalDate())) {
            dailyMealStatistics.put(currentDate, new DailyMealStatistics());
            currentDate = currentDate.minusDays(1);
        }
        this.totalTime = Duration.ZERO;
    }

    public void addMeal(OrderMeal orderMeal, LocalDate date) {
        Duration duration = Duration.between(orderMeal.getReceivedDateTime(), orderMeal.getCompletedDateTime());
        dailyMealStatistics.get(date).addMeal(orderMeal.getQuantity(), duration);
        this.totalQuantity += orderMeal.getQuantity();
        this.totalTime = this.totalTime.plus(duration);
    }

    public int getAverageDailySoldMealsQuantity() {
        return this.dailyMealStatistics.size() > 0 ? this.totalQuantity / this.dailyMealStatistics.size() : 0;
    }

    public Duration getAverageMealPrepareTime() {
        return (this.totalTime != null && this.totalQuantity > 0) ? this.totalTime.dividedBy(this.totalQuantity) : Duration.ZERO;

    }
}
