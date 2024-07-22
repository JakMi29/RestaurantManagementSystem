package com.example.RestaurantManagementSystem.business.dao;


import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;

public interface OrderMealDAO {

    void deleteByMealAndOrderNumber(Meal meal, Order order);

    OrderMeal findByMealAndOrder(Meal meal, Order order);

    void updateOrderMeal(OrderMeal orderMeal);
}
