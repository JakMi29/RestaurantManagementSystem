package com.example.RestaurantManagementSystem.domain;

import lombok.Data;

@Data
public class DailyOrdersStatistics {
    private int totalGuests;
    private int totalOrders;
    private int totalMeals;

    public void addOrder(Order order) {
        this.totalOrders++;
        this.totalGuests += order.getCustomerQuantity();
    }
}
