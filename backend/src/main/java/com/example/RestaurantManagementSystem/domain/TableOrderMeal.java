package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Duration;

@Data
public class TableOrderMeal {
    private int quantity;
    private Duration time;
    private BigDecimal totalPrice;
    private BigDecimal mealPrice;

    public TableOrderMeal(OrderMeal orderMeal){
        this.mealPrice= orderMeal.getPrice();
        this.totalPrice= BigDecimal.ZERO;
        this.time=Duration.ZERO;

    }

    public void addMeal(OrderMeal orderMeal) {
        this.quantity += orderMeal.getQuantity();
        this.totalPrice=this.totalPrice.add(orderMeal.getPrice().multiply(BigDecimal.valueOf(orderMeal.getQuantity())));
        this.time = this.time.plus(Duration.between(orderMeal.getReceivedDateTime(), orderMeal.getCompletedDateTime()))
                .dividedBy(this.quantity);
    }
}
