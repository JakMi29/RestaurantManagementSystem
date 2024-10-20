package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
public class DailyMealsStatistics {
    private int totalQuantity;
    private Duration totalTime;
    private Map<LocalDateTime, DailyMealStatistics> dailyMealStatistics;

    public DailyMealsStatistics(LocalDateTime startDate, LocalDateTime endDate, Boolean today) {
        dailyMealStatistics = new HashMap<>();
        if (today) {
            LocalDate todayDate = LocalDate.now();
            LocalDateTime currentHour = todayDate.atStartOfDay();
            LocalDateTime endOfDay = todayDate.atTime(23, 0);

            while (!currentHour.isAfter(endOfDay)) {
                dailyMealStatistics.put(currentHour, new DailyMealStatistics());
                currentHour = currentHour.plusHours(1);
            }
        } else {
            LocalDateTime currentDate = endDate.withHour(0).withMinute(0).withSecond(0).withNano(0);
            while (!currentDate.isBefore(startDate.withHour(0).withMinute(0).withSecond(0).withNano(0))) {
                dailyMealStatistics.put(currentDate, new DailyMealStatistics());
                currentDate = currentDate.minusDays(1);
            }
        }
        this.totalTime = Duration.ZERO;
    }

    public void addMeal(OrderMeal orderMeal, LocalDateTime date,Boolean today) {
        Duration duration = Duration.between(orderMeal.getReceivedDateTime(), orderMeal.getCompletedDateTime());
        dailyMealStatistics
                .get(
                        today?date.withMinute(0).withSecond(0).withNano(0):
                                date.withHour(0).withMinute(0).withSecond(0).withNano(0)
                )
                .addMeal(orderMeal.getQuantity(), duration);
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
