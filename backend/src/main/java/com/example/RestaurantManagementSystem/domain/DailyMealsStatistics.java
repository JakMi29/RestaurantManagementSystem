package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.time.Duration;

@Data
public class DailyMealsStatistics {
    private int quantity;
    private Duration time;

    public DailyMealsStatistics(){
        this.time=Duration.ZERO;
    }

    public void addMeal(OrderMeal orderMeal) {
        this.quantity += orderMeal.getQuantity();
        this.time = this.time.plus(Duration.between(orderMeal.getReceivedDateTime(), orderMeal.getCompletedDateTime()));
    }
}
