package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class DailyWaiterStatistics {
    LocalDate date;
    Integer totalOrders;
    BigDecimal totalPrice;

    public DailyWaiterStatistics() {
        this.totalPrice = BigDecimal.ZERO;
    }

    public void Order(Order order) {
        this.totalOrders += 1;
        this.totalPrice = this.totalPrice.add(order.getPrice());
    }
}
