package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
public class DailyOrdersStatistics {
    int totalCustomers;
    int totalOrders;
    int totalMeals;
    BigDecimal totalIncome;
    Duration totalDuration;
    Map<LocalDateTime, DailyOrderStatistics> dateDailyOrderStatisticsMap;

    public DailyOrdersStatistics(LocalDateTime startDate, LocalDateTime endDate, Boolean today) {
        dateDailyOrderStatisticsMap = new HashMap<>();
        this.totalIncome = BigDecimal.ZERO;
        this.totalDuration=Duration.ZERO;
        if (today) {
            LocalDate todayDate = LocalDate.now();
            LocalDateTime currentHour = todayDate.atStartOfDay();
            LocalDateTime endOfDay = todayDate.atTime(23, 0);

            while (!currentHour.isAfter(endOfDay)) {
                dateDailyOrderStatisticsMap.put(currentHour, new DailyOrderStatistics());
                currentHour = currentHour.plusHours(1);
            }
        } else {
            LocalDateTime currentDate = endDate.withHour(0).withMinute(0).withSecond(0).withNano(0);
            while (!currentDate.isBefore(startDate.withHour(0).withMinute(0).withSecond(0).withNano(0))) {
                dateDailyOrderStatisticsMap.put(currentDate, new DailyOrderStatistics());
                currentDate = currentDate.minusDays(1);
            }
        }
    }

    public void addOrder(Order order, Boolean today) {
        this.totalOrders++;
        this.totalCustomers += order.getCustomerQuantity();
        this.totalMeals += order.getOrderMeals().size();
        this.totalIncome = this.totalIncome.add(order.getPrice());
        this.totalDuration = this.totalDuration.plus(Duration.between(order.getReceivedDateTime(), order.getCompletedDateTime()));
        dateDailyOrderStatisticsMap.get(
                today ?
                        order.getCompletedDateTime()
                                .toLocalDateTime()
                                .withMinute(0)
                                .withSecond(0)
                                .withNano(0) :
                        order.getCompletedDateTime()
                                .toLocalDateTime()
                                .withHour(0)
                                .withMinute(0)
                                .withSecond(0)
                                .withNano(0)
        ).addOrder(order);
    }

    public BigDecimal getAverageOrderIncome() {
        if (totalOrders == 0) {
            return BigDecimal.ZERO;
        }
        return this.totalIncome.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP);
    }

    public Duration getAverageOrderDuration() {
        if (totalOrders == 0) {
            return Duration.ZERO;
        }
        return this.totalDuration.dividedBy(this.totalOrders);
    }

    public BigDecimal getAverageDailyIncome() {
        int days = dateDailyOrderStatisticsMap.size();
        if (days == 0) {
            return BigDecimal.ZERO;
        }
        return this.totalIncome.divide(BigDecimal.valueOf(days), 2, RoundingMode.HALF_UP);
    }

    public int getAverageCustomersPerOrder() {
        int days = dateDailyOrderStatisticsMap.size();
        if (days == 0) {
            return 0;
        }
        return this.totalOrders / days;
    }

    public int getAverageMealsPerOrder() {
        if (totalOrders == 0) {
            return 0;
        }
        return this.totalMeals / totalOrders;
    }

    public Integer getAverageCustomersPerDay() {
        int days = dateDailyOrderStatisticsMap.size();
        if (days == 0) {
            return 0;
        }
        return this.totalCustomers / days;
    }

    public Integer getAverageOrdersPerDay() {
        int days = dateDailyOrderStatisticsMap.size();
        if (days == 0) {
            return 0;
        }
        return this.totalOrders / days;
    }
}
