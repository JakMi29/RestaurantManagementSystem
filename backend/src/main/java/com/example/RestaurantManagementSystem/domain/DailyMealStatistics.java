package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.time.Duration;

@Data
public class DailyMealStatistics {
    private int quantity;
    private Duration time;

    public DailyMealStatistics(){
        this.time=Duration.ZERO;
    }

    public void addMeal(int quantity, Duration duration) {
        this.quantity += quantity;
        this.time = this.time.plus(duration);
    }
}
