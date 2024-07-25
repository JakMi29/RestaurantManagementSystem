package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantOwnerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantOwnerJpaRepository extends JpaRepository<RestaurantOwnerEntity, Integer> {
}
