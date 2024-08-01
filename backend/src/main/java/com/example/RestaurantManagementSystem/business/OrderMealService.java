package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.business.dao.OrderMealDAO;
import com.example.RestaurantManagementSystem.domain.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

@Service
@AllArgsConstructor
public class OrderMealService {

    MealService mealService;
    OrderMealDAO orderMealDAO;


    @Transactional
    void updateStatus(String mealName, Restaurant restaurant, Order order) {
        Meal meal = mealService.findByNameAndRestaurant(mealName, restaurant);
        OrderMeal orderMeal = orderMealDAO.findByMealAndOrder(meal, order);
        orderMealDAO.updateOrderMeal(
                orderMeal.withStatus(
                        switch (orderMeal.getStatus()) {
                            case PREPARING -> OrderMealStatus.READY;
                            case READY -> OrderMealStatus.RELEASED;
                            default -> {
                                throw new RuntimeException("Invalid order meal status");
                            }
                        }));
    }

    @Transactional
    void removeOrderMeal(String mealName, Restaurant restaurant, Order order) {
        Meal meal = mealService.findByNameAndRestaurant(mealName, restaurant);
        orderMealDAO.deleteByMealAndOrderNumber(meal, order);
    }

    @Transactional
    public OrderMeal prepareOrderMeal(Map.Entry<String, Integer> entry, Restaurant restaurant) {
        Meal meal = mealService.findByNameAndRestaurant(entry.getKey(), restaurant);
        return OrderMeal.builder()
                .meal(meal)
                .receivedDateTime(OffsetDateTime.now())
                .quantity(entry.getValue())
                .price(meal.getPrice().multiply(new BigDecimal(entry.getValue())))
                .build();
    }

}
