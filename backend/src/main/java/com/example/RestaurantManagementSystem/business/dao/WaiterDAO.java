package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Waiter;

public interface WaiterDAO {
    Waiter createWaiter(String email);
}
