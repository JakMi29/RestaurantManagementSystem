package com.example.RestaurantManagementSystem.business.dao;


import com.example.RestaurantManagementSystem.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderMealDAO {

    void deleteByMealAndOrderNumber(Meal meal, Order order);

    List<OrderMeal> findAllByMealAndOrder(Meal meal, Order order);
    Optional<OrderMeal> findByMealAndOrderAndStatus(Meal meal, Order order, OrderMealStatus orderMealStatus);

    void update(OrderMeal orderMeal);
    void save(OrderMeal orderMeal);

    void delete(OrderMeal orderMeal);
}
