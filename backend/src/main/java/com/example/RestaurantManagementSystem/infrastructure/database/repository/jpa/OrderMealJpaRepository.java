package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderMealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMealJpaRepository extends JpaRepository<OrderMealEntity, Integer> {


    void removeByMealAndOrder(MealEntity meal, OrderEntity order);

    OrderMealEntity findByMealAndOrder(MealEntity meal, OrderEntity order);
}
