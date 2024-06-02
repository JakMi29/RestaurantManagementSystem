package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantJpaRepository extends JpaRepository<RestaurantEntity,Integer> {
    RestaurantEntity findByName(String name);

}
