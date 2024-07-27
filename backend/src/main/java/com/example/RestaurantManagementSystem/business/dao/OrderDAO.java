package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;

public interface OrderDAO {
    void createOrder(Order order);

    void updateOrder(Order order);

    Order findByNumber(String orderNumber);

    Order findByTableAndNotByStatus(Table table, OrderStatus status);
}
