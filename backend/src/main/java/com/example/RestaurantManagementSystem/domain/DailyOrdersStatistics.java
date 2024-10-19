package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
public class DailyOrdersStatistics {
    int totalCustomers;
    int totalOrders;
    int totalMeals;
    BigDecimal totalIncome;
    Duration totalDuration;
    Map<LocalDate, DailyOrderStatistics> dateDailyOrderStatisticsMap;

    public DailyOrdersStatistics(OffsetDateTime startDate, OffsetDateTime endDate) {
        dateDailyOrderStatisticsMap = new HashMap<>();
        this.totalIncome = BigDecimal.ZERO;
        LocalDate currentDate = endDate.toLocalDate();
        while (!currentDate.isBefore(startDate.toLocalDate())) {
            dateDailyOrderStatisticsMap.put(currentDate, new DailyOrderStatistics());
            currentDate = currentDate.minusDays(1);
            this.totalDuration = Duration.ZERO;
        }
    }

    public void addOrder(Order order) {
        this.totalOrders++;
        this.totalCustomers += order.getCustomerQuantity();
        this.totalMeals+=order.getOrderMeals().size();
        this.totalIncome = this.totalIncome.add(order.getPrice());
        this.totalDuration = this.totalDuration.plus(Duration.between(order.getReceivedDateTime(), order.getCompletedDateTime()));
        dateDailyOrderStatisticsMap.get(order.getCompletedDateTime().toLocalDate()).addOrder(order);
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
