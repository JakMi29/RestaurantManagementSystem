package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.OrderMealStatus;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderMealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderMealJpaRepository extends JpaRepository<OrderMealEntity, Integer> {


    void removeByMealAndOrder(MealEntity meal, OrderEntity order);

    List<OrderMealEntity> findAllByMealAndOrder(MealEntity meal, OrderEntity order);
    Optional<OrderMealEntity> findByMealAndOrderAndStatus(MealEntity meal, OrderEntity order, OrderMealStatus orderMealStatus);
}
