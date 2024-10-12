package com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa;

import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.TableStatus;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface OrderJpaRepository extends JpaRepository<OrderEntity, Integer> {

    Page<OrderEntity> findByRestaurantAndCompletedDateTimeBetween(
            RestaurantEntity restaurant, OffsetDateTime startDate, OffsetDateTime endDate, Pageable pageable);
    @EntityGraph(attributePaths = {"orderMeals", "orderMeals.meal", "waiter", "table"})
    @Query("SELECT o FROM OrderEntity o WHERE o.restaurant = :restaurant AND o.completedDateTime BETWEEN :startDate AND :endDate")
    List<OrderEntity> findByRestaurantAndCompletedDateTimeBetween(
            RestaurantEntity restaurant, OffsetDateTime startDate, OffsetDateTime endDate);

    OrderEntity findByNumber(String orderNumber);
    Optional<OrderEntity> findByTableAndStatusNot(TableEntity tableEntity, OrderStatus status);

    @EntityGraph(attributePaths = {"orderMeals", "orderMeals.meal", "waiter", "table"})
    @Query("SELECT o FROM OrderEntity o WHERE o.waiter = :waiter AND o.completedDateTime BETWEEN :startDate AND :endDate")
    List<OrderEntity> findByWaiterAndCompletedDateTimeBetween(WaiterEntity waiter, OffsetDateTime startDate, OffsetDateTime endDate);
}
