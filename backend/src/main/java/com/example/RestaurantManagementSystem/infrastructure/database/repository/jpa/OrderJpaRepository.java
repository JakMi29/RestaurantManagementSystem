package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderJpaRepository extends JpaRepository<OrderEntity, Integer> {

    List<MealEntity> findAllByRestaurant(RestaurantEntity restaurant);

    OrderEntity findByNumber(String orderNumber);
}
