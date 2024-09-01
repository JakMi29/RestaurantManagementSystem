package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.OrderMealDAO;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import com.example.RestaurantManagementSystem.domain.OrderMealStatus;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.OrderMealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderMealEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public List<OrderMeal> findAllByMealAndOrder(Meal meal, Order order) {
        return repository.findAllByMealAndOrder(mealMapper.map(meal), orderMapper.map(order))
                .stream()
                .map(mapper::map)
                .toList();
    }

    public Optional<OrderMeal> findByMealAndOrderAndStatus(Meal meal, Order order, OrderMealStatus orderMealStatus) {
        return repository.findByMealAndOrderAndStatus(mealMapper.map(meal), orderMapper.map(order), orderMealStatus).map(mapper::map);
    }

    @Override
    public void update(OrderMeal orderMeal) {
        repository.saveAndFlush(mapper.map(orderMeal));
    }

    @Override
    public void save(OrderMeal orderMeal) {
        repository.saveAndFlush(mapper.map(orderMeal));
    }

    @Override
    public void delete(OrderMeal orderMeal) {
        repository.delete(mapper.map(orderMeal));
    }
}
