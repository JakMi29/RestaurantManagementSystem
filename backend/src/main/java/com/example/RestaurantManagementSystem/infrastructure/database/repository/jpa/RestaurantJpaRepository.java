package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantJpaRepository extends JpaRepository<RestaurantEntity, Integer> {
    RestaurantEntity findByName(String name);

}
