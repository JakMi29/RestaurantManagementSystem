package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TableJpaRepository extends JpaRepository<TableEntity, Integer> {

    List<TableEntity> findAllByRestaurant(RestaurantEntity restaurant);

    TableEntity findByNameAndRestaurant(String name, RestaurantEntity restaurantEntity);

    @Query("SELECT t FROM TableEntity t LEFT JOIN FETCH t.orders o WHERE t.restaurant = :restaurant")
    List<TableEntity> findAllTablesWithOrdersByRestaurant(@Param("restaurant") RestaurantEntity restaurant);

    List<TableEntity> findByRestaurant(RestaurantEntity restaurant);
}
