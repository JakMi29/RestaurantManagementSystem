package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.OrderMealDTO;
import com.example.RestaurantManagementSystem.business.dao.OrderMealDAO;
import com.example.RestaurantManagementSystem.domain.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderMealService {

    MealService mealService;
    OrderMealDAO orderMealDAO;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    void updateStatus(String mealName, Restaurant restaurant, Order order, OrderMealStatus orderMealStatus) {
        Meal meal = mealService.findByNameAndRestaurant(mealName, restaurant);
        List<OrderMeal> orderMeals = orderMealDAO.findAllByMealAndOrder(meal, order);
        Map<OrderMealStatus, OrderMeal> mealByStatus = orderMeals.stream()
                .collect(Collectors.toMap(
                        OrderMeal::getStatus,
                        Function.identity()
                ));
        OrderMealStatus nextOrderMealStatus = getNextStatus(orderMealStatus);
        Optional<OrderMeal> optNewStatusMeal = orderMealDAO.findByMealAndOrderAndStatus(meal, order, nextOrderMealStatus);
        OrderMeal orderMeal = mealByStatus.get(orderMealStatus);
        OrderMeal newOrderMeal = optNewStatusMeal
                .orElseGet(() -> this.createOrderMealWithNewStatus(orderMeal, nextOrderMealStatus));
        update(orderMeal, newOrderMeal);
        entityManager.flush();
        entityManager.clear();
    }

    private OrderMeal createOrderMealWithNewStatus(OrderMeal orderMeal, OrderMealStatus status) {
        return OrderMeal.builder()
                .order(orderMeal.getOrder())
                .meal(orderMeal.getMeal())
                .receivedDateTime(orderMeal.getReceivedDateTime())
                .status(status)
                .price(orderMeal.getMeal().getPrice())
                .quantity(0)
                .build();
    }

    @Transactional
    private void update(OrderMeal orderMeal, OrderMeal newOrderMeal) {
        if (orderMeal.getQuantity() == 1) {
            orderMealDAO.delete(orderMeal);
            if (newOrderMeal.getStatus() == OrderMealStatus.RELEASED) {
                newOrderMeal = newOrderMeal.withCompletedDateTime(OffsetDateTime.now());
            }
        } else {
            orderMealDAO.save(orderMeal.withQuantity((orderMeal.getQuantity() - 1)));
        }
        orderMealDAO.save(newOrderMeal.withQuantity(newOrderMeal.getQuantity() + 1));
    }


    private OrderMealStatus getNextStatus(OrderMealStatus status) {
        return switch (status) {
            case PREPARING -> OrderMealStatus.READY;
            case READY -> OrderMealStatus.RELEASED;
            default -> throw new RuntimeException("Bad status");
        };
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

    @Transactional
    public void updateOrderMeals(Order order, List<OrderMealDTO> meals) {
        List<OrderMeal> orderMeals = order.getOrderMeals().stream().
                filter(orderMeal -> orderMeal.getStatus() == OrderMealStatus.PREPARING)
                .toList();
        System.out.println(orderMeals);

        for (OrderMealDTO meal : meals) {
            OrderMeal updateOrderMeal = orderMeals.stream()
                    .filter(orderMeal -> orderMeal.getMeal().getName().equals(meal.getMeal().getName()))
                    .findFirst().orElse(this.createOrderMeal(meal.getMeal().getName(), order));
            System.out.println(updateOrderMeal);
            orderMealDAO.save(updateOrderMeal
                    .withQuantity(meal.getQuantity())
                    .withPrice(meal.getMeal().getPrice().multiply(BigDecimal.valueOf(meal.getQuantity())))
            );
        }
        List<String> incomingMealNames = meals.stream()
                .map(meal -> meal.getMeal().getName())
                .toList();

        orderMeals.stream()
                .filter(orderMeal -> !incomingMealNames.contains(orderMeal.getMeal().getName()))
                .forEach(orderMeal -> orderMealDAO.delete(orderMeal));

        entityManager.flush();
        entityManager.clear();
    }

    private OrderMeal createOrderMeal(String mealName, Order order) {
        Meal meal = mealService.findByNameAndRestaurant(mealName, order.getRestaurant());
        return OrderMeal.builder()
                .order(order)
                .meal(meal)
                .receivedDateTime(OffsetDateTime.now())
                .status(OrderMealStatus.PREPARING)
                .build();
    }
}
