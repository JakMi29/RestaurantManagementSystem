package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DailyOrderStatistics {
    private int totalGuests;
    private int totalOrders;
    private BigDecimal totalIncome;

    public DailyOrderStatistics(){
        this.totalIncome=BigDecimal.ZERO;
    }

    public void addOrder(Order order) {
        this.totalOrders++;
        this.totalGuests += order.getCustomerQuantity();
        this.totalIncome = this.totalIncome.add(order.getPrice());
    }
}
