package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderMealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderMealJpaRepository extends JpaRepository<OrderMealEntity,Integer> {


    void removeByMealAndOrder(MealEntity meal, OrderEntity order);

    OrderMealEntity findByMealAndOrder(MealEntity meal, OrderEntity order);
}
