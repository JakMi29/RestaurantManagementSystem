package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.WaiterEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WaiterJpaRepository extends JpaRepository<WaiterEntity, Integer> {
    WaiterEntity findByEmail(String email);

    @Query("SELECT DISTINCT w FROM WaiterEntity w " +
            "JOIN w.user u " +
            "WHERE w.restaurant = :restaurant " +
            "AND CONCAT(u.name, ' ', u.surname) LIKE %:searchTerm%")
    Page<WaiterEntity> findAllByRestaurantAndSearchTerms(
            RestaurantEntity restaurant,
            String searchTerm,
            Pageable pageable
    );

    @Query("SELECT DISTINCT w FROM WaiterEntity w " +
            "JOIN w.user u " +

            "WHERE w.restaurant = :restaurant")
    Page<WaiterEntity> findAllByRestaurant(
            RestaurantEntity restaurant,
            Pageable pageable
    );

}
