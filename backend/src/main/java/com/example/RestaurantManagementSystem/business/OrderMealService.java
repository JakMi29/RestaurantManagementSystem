package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.OrderMealDTO;
import com.example.RestaurantManagementSystem.business.dao.OrderMealDAO;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
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

    private final MealService mealService;
    private final OrderMealDAO orderMealDAO;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void updateStatus(String mealName, Restaurant restaurant, Order order, OrderMealStatus orderMealStatus) {
        Meal meal = mealService.findByNameAndRestaurant(mealName, restaurant);
        OrderMeal orderMeal = findOrderMealByStatus(meal, order, orderMealStatus);

        OrderMealStatus nextStatus = getNextStatus(orderMealStatus);
        OrderMeal updatedOrderMeal = findOrCreateOrderMealWithStatus(meal, order, nextStatus, orderMeal);

        updateOrderMealQuantities(orderMeal, updatedOrderMeal);
        clearPersistenceContext();
    }

    private OrderMeal findOrderMealByStatus(Meal meal, Order order, OrderMealStatus status) {
        return orderMealDAO.findAllByMealAndOrder(meal, order).stream()
                .filter(orderMeal -> orderMeal.getStatus() == status)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Order meal with status %s not found".formatted(status)));
    }

    private OrderMeal findOrCreateOrderMealWithStatus(Meal meal, Order order, OrderMealStatus status, OrderMeal originalOrderMeal) {
        return orderMealDAO.findByMealAndOrderAndStatus(meal, order, status)
                .orElseGet(() -> createOrderMealWithNewStatus(originalOrderMeal, status));
    }

    private OrderMeal createOrderMealWithNewStatus(OrderMeal orderMeal, OrderMealStatus status) {
        return OrderMeal.builder()
                .order(orderMeal.getOrder())
                .meal(orderMeal.getMeal())
                .receivedDateTime(orderMeal.getReceivedDateTime())
                .completedDateTime(status == OrderMealStatus.RELEASED ? OffsetDateTime.now() : null)
                .status(status)
                .price(orderMeal.getMeal().getPrice())
                .quantity(0)
                .build();
    }

    private void updateOrderMealQuantities(OrderMeal currentOrderMeal, OrderMeal updatedOrderMeal) {
        if (currentOrderMeal.getQuantity() == 1) {
            orderMealDAO.delete(currentOrderMeal);
            if (updatedOrderMeal.getStatus() == OrderMealStatus.RELEASED) {
                updatedOrderMeal = updatedOrderMeal.withCompletedDateTime(OffsetDateTime.now());
            }
        } else {
            orderMealDAO.save(currentOrderMeal.withQuantity(currentOrderMeal.getQuantity() - 1));
        }
        orderMealDAO.save(updatedOrderMeal.withQuantity(updatedOrderMeal.getQuantity() + 1));
    }

    @Transactional
    public void removeOrderMeal(String mealName, Restaurant restaurant, Order order) {
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
                .price(meal.getPrice().multiply(BigDecimal.valueOf(entry.getValue())))
                .build();
    }

    @Transactional
    public void updateOrderMeals(Order order, List<OrderMealDTO> meals) {
        List<OrderMeal> preparingMeals = filterPreparingOrderMeals(order);
        Map<String, OrderMealDTO> mealMap = meals.stream().collect(Collectors.toMap(
                dto -> dto.getMeal().getName(),
                Function.identity()
        ));

        processUpdatedOrderMeals(preparingMeals, mealMap, order);
        removeUnusedOrderMeals(preparingMeals, mealMap);

        clearPersistenceContext();
    }

    private List<OrderMeal> filterPreparingOrderMeals(Order order) {
        return order.getOrderMeals().stream()
                .filter(orderMeal -> orderMeal.getStatus() == OrderMealStatus.PREPARING)
                .toList();
    }

    private void processUpdatedOrderMeals(List<OrderMeal> preparingMeals, Map<String, OrderMealDTO> mealMap, Order order) {
        for (OrderMealDTO mealDTO : mealMap.values()) {
            OrderMeal orderMeal = preparingMeals.stream()
                    .filter(m -> m.getMeal().getName().equals(mealDTO.getMeal().getName()))
                    .findFirst()
                    .orElseGet(() -> createOrderMeal(mealDTO.getMeal().getName(), order));
            orderMealDAO.save(orderMeal
                    .withQuantity(mealDTO.getQuantity())
                    .withPrice(mealDTO.getMeal().getPrice().multiply(BigDecimal.valueOf(mealDTO.getQuantity())))
            );
        }
    }

    private void removeUnusedOrderMeals(List<OrderMeal> preparingMeals, Map<String, OrderMealDTO> mealMap) {
        preparingMeals.stream()
                .filter(orderMeal -> !mealMap.containsKey(orderMeal.getMeal().getName()))
                .forEach(orderMealDAO::delete);
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

    private OrderMealStatus getNextStatus(OrderMealStatus status) {
        return switch (status) {
            case PREPARING -> OrderMealStatus.READY;
            case READY -> OrderMealStatus.RELEASED;
            default -> throw new IllegalArgumentException("Invalid status: " + status);
        };
    }

    private void clearPersistenceContext() {
        entityManager.flush();
        entityManager.clear();
    }
}

