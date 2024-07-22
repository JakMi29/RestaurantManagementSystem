package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;

public interface WaiterDAO {
    Waiter createWaiter(Waiter waiter);

    Waiter findByEmail(String email);
}
