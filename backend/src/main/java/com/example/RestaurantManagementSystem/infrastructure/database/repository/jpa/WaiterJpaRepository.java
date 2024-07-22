package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaiterJpaRepository extends JpaRepository<WaiterEntity,Integer> {

    WaiterEntity findByEmail(String email);

}
