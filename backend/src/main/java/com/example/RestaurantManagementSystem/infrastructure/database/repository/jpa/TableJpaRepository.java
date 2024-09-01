package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TableJpaRepository extends JpaRepository<TableEntity, Integer> {

    List<TableEntity> findAllByRestaurant(RestaurantEntity restaurant);

    TableEntity findByNameAndRestaurant(String name, RestaurantEntity restaurantEntity);

    @EntityGraph(attributePaths = {"orders", "orders.orderMeals", "orders.orderMeals.meal", "orders.waiter"})
    @Query("SELECT t FROM TableEntity t " +
            "LEFT JOIN t.orders o ON o.status <> :orderStatus " +
            "WHERE t.restaurant = :restaurant")
    List<TableEntity> findAllTablesWithOrdersByRestaurant(
            @Param("restaurant") RestaurantEntity restaurant,
            @Param("orderStatus") OrderStatus orderStatus);

    List<TableEntity> findByRestaurant(RestaurantEntity restaurant);
}
