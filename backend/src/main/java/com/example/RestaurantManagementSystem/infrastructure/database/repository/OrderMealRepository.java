package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.OrderMealDAO;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.OrderMealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderMealEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class OrderMealRepository implements OrderMealDAO {
    private final OrderMealJpaRepository repository;
    private final OrderMealEntityMapper mapper;
    private final OrderEntityMapper orderMapper;
    private final MealEntityMapper mealMapper;

    @Override
    public void deleteByMealAndOrderNumber(Meal meal, Order order) {
        repository.removeByMealAndOrder(mealMapper.map(meal), orderMapper.map(order));
    }

    @Override
    public OrderMeal findByMealAndOrder(Meal meal, Order order) {
        return mapper.map(repository.findByMealAndOrder(mealMapper.map(meal), orderMapper.map(order)));
    }

    @Override
    public void updateOrderMeal(OrderMeal orderMeal) {
        repository.save(mapper.map(orderMeal));
    }
}
