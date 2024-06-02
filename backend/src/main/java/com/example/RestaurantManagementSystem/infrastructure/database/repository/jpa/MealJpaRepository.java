package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealJpaRepository extends JpaRepository<MealEntity,Integer> {

    List<MealEntity> findAllByRestaurant(RestaurantEntity restaurant);
    List<MealEntity> findAllByRestaurantAndCategory(RestaurantEntity restaurant, Category category);

    MealEntity findByNameAndRestaurant(String name, RestaurantEntity restaurantEntity);
}
