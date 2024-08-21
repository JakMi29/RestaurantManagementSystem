package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealJpaRepository extends JpaRepository<MealEntity, Integer> {

    List<MealEntity> findAllByRestaurant(RestaurantEntity restaurant);

    Page<MealEntity> findAllByRestaurantAndCategoryAndStatusNot(
            RestaurantEntity restaurant,
            Category category,
            MealStatus status,
            Pageable pageable);

    Page<MealEntity> findAllByRestaurantAndCategoryAndStatusNotAndNameContaining(
            RestaurantEntity restaurant,
            Category category,
            MealStatus status,
            Pageable pageable,
            String searchTerms);

    Page<MealEntity> findAllByRestaurantAndCategoryAndStatusNotAndNameNotIn(
            RestaurantEntity restaurant,
            Category category,
            MealStatus status,
            Pageable pageable,
            List<String> excludedNames);

    Page<MealEntity> findAllByRestaurantAndCategoryAndStatusNotAndNameContainingAndNameNotIn(
            RestaurantEntity restaurant,
            Category category,
            MealStatus status,
            Pageable pageable,
            String searchTerms,
            List<String> excludedNames);

    MealEntity findByNameAndRestaurant(String name, RestaurantEntity restaurantEntity);
}
