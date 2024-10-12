package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TableJpaRepository extends JpaRepository<TableEntity, Integer> {

    List<TableEntity> findAllByRestaurant(RestaurantEntity restaurant);

    Optional<TableEntity> findByNameAndRestaurant(String name, RestaurantEntity restaurantEntity);

    @Query("SELECT t FROM TableEntity t " +
            "WHERE t.restaurant = :restaurant AND t.active = true")
    Page<TableEntity> findAllTablesByRestaurant(
            @Param("restaurant") RestaurantEntity restaurant,
            Pageable pageable);

    @Query("SELECT t FROM TableEntity t " +
            "WHERE t.restaurant = :restaurant AND t.active = true " +
            "AND LOWER(t.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<TableEntity> findAllTablesByRestaurantAndSearchTerm(
            @Param("restaurant") RestaurantEntity restaurant,
            Pageable pageable,
            @Param("searchTerm") String searchTerm);

    List<TableEntity> findByRestaurant(RestaurantEntity restaurant);
}
