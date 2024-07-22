package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Order;

public interface OrderDAO {
    void createOrder(Order order);

    void updateOrder(Order order);

    Order findByNumber(String orderNumber);
}
