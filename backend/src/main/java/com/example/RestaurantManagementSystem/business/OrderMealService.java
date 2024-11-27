package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.OrderMealDTO;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import com.example.RestaurantManagementSystem.domain.OrderMealStatus;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderMealService {

    private final MealService mealService;

    @Transactional
    public List<OrderMeal> prepareOrderMeals(List<OrderMealDTO> incomingMeals, Order order) {
        List<OrderMeal> existingMeals = order.getOrderMeals();
        List<OrderMeal> updatedMeals = updateMeals(incomingMeals, existingMeals);
        List<OrderMeal> newMeals = createNewMeals(incomingMeals, updatedMeals, order);

        return combineMeals(updatedMeals, newMeals);
    }

    public List<OrderMeal> updateMeal(Order order, String mealName, String orderMealStatus) {
        List<OrderMeal> orderMeals = new ArrayList<>(order.getOrderMeals());
        OrderMealStatus status = OrderMealStatus.valueOf(orderMealStatus);

        OrderMeal orderMeal = findOrderMeal(orderMeals, mealName, status)
                .orElseThrow(() -> new NotFoundException("OrderMeal not found"));

        orderMeals.remove(orderMeal);
        updateOrderMeals(orderMeals, order, orderMeal, status);

        return orderMeals;
    }

    private void updateOrderMeals(List<OrderMeal> orderMeals, Order order, OrderMeal orderMeal, OrderMealStatus status) {
        OrderMealStatus nextStatus = getNextStatus(status);
        Optional<OrderMeal> existingMeal = findOrderMeal(orderMeals, orderMeal.getMeal().getName(), nextStatus);

        if (orderMeal.getQuantity() == 1) {
            handleSingleQuantityMeal(orderMeals, order, orderMeal, nextStatus, existingMeal);
        } else {
            handleMultipleQuantityMeal(orderMeals, order, orderMeal, nextStatus, existingMeal);
        }
    }

    private void handleSingleQuantityMeal(List<OrderMeal> orderMeals, Order order, OrderMeal orderMeal, OrderMealStatus nextStatus, Optional<OrderMeal> existingMeal) {
        if (existingMeal.isPresent()) {
            updateExistingMeal(orderMeals, existingMeal.get());
        } else {
            addNewMeal(orderMeals, order, orderMeal, nextStatus);
        }
    }

    private void handleMultipleQuantityMeal(List<OrderMeal> orderMeals, Order order, OrderMeal orderMeal, OrderMealStatus nextStatus, Optional<OrderMeal> existingMeal) {
        if (existingMeal.isPresent()) {
            updateExistingMeal(orderMeals, existingMeal.get());
        } else {
            addNewMeal(orderMeals, order, orderMeal, nextStatus);
        }
        orderMeals.add(orderMeal.withQuantity(orderMeal.getQuantity() - 1));
    }

    private void updateExistingMeal(List<OrderMeal> orderMeals, OrderMeal existingMeal) {
        OrderMeal updatedMeal = existingMeal
                .withQuantity(existingMeal.getQuantity() + 1)
                .withReceivedDateTime(existingMeal.getReceivedDateTime())
                .withCompletedDateTime(existingMeal.getStatus() == OrderMealStatus.RELEASED ? OffsetDateTime.now() : null);
        orderMeals.remove(existingMeal);
        orderMeals.add(updatedMeal);
    }

    private void addNewMeal(List<OrderMeal> orderMeals, Order order, OrderMeal orderMeal, OrderMealStatus nextStatus) {
        orderMeals.add(OrderMeal.builder()
                .order(order)
                .status(nextStatus)
                .meal(orderMeal.getMeal())
                .price(orderMeal.getMeal().getPrice())
                .receivedDateTime(orderMeal.getReceivedDateTime())
                .completedDateTime(nextStatus == OrderMealStatus.RELEASED ? OffsetDateTime.now() : null)
                .quantity(1)
                .build());
    }

    private OrderMealStatus getNextStatus(OrderMealStatus status) {
        return switch (status) {
            case NEW -> OrderMealStatus.PREPARING;
            case PREPARING -> OrderMealStatus.READY;
            case READY, RELEASED -> OrderMealStatus.RELEASED;
        };
    }

    @Transactional
    private OrderMeal buildNewMeal(OrderMealDTO incomingMeal, Order order) {
        Meal meal = mealService.findByNameAndRestaurant(incomingMeal.getMeal().getName(), order.getRestaurant());
        return OrderMeal.builder()
                .order(order)
                .meal(meal)
                .price(calculatePrice(meal, incomingMeal.getQuantity()))
                .status(OrderMealStatus.PREPARING)
                .completedDateTime(null)
                .quantity(incomingMeal.getQuantity())
                .receivedDateTime(OffsetDateTime.now())
                .build();
    }

    private Optional<OrderMeal> findOrderMeal(List<OrderMeal> orderMeals, String mealName, OrderMealStatus orderMealStatus) {
        return orderMeals.stream().
                filter(meal -> meal.getMeal().getName().equals(mealName) &&
                        meal.getStatus().equals(orderMealStatus))
                .findFirst();
    }

    private List<OrderMeal> updateMeals(List<OrderMealDTO> incomingMeals, List<OrderMeal> existingMeals) {
        return existingMeals.stream()
                .filter(meal -> hasMatchingIncomingMeal(meal, incomingMeals))
                .map(meal -> updateMealQuantity(meal, incomingMeals))
                .collect(Collectors.toList());
    }

    private OrderMeal updateMealQuantity(OrderMeal meal, List<OrderMealDTO> incomingMeals) {
        return incomingMeals.stream()
                .filter(incomingMeal -> isMatchingMeal(meal, incomingMeal))
                .findFirst()
                .map(matchingMeal -> meal.withQuantity(matchingMeal.getQuantity()))
                .orElse(meal);
    }

    private boolean hasMatchingIncomingMeal(OrderMeal meal, List<OrderMealDTO> incomingMeals) {
        return incomingMeals.stream()
                .anyMatch(incomingMeal -> isMatchingMeal(meal, incomingMeal));
    }

    private boolean isMatchingMeal(OrderMeal meal, OrderMealDTO incomingMeal) {
        return incomingMeal.getMeal().getName().equals(meal.getMeal().getName()) &&
                OrderMealStatus.valueOf(incomingMeal.getStatus()).equals(meal.getStatus());
    }

    private List<OrderMeal> createNewMeals(List<OrderMealDTO> incomingMeals, List<OrderMeal> existingMeals, Order order) {
        return incomingMeals.stream()
                .filter(incomingMeal -> isNewMeal(incomingMeal, existingMeals))
                .map(incomingMeal -> buildNewMeal(incomingMeal, order))
                .collect(Collectors.toList());
    }

    private boolean isNewMeal(OrderMealDTO incomingMeal, List<OrderMeal> existingMeals) {
        return existingMeals.stream()
                .noneMatch(existingMeal -> incomingMeal.getMeal().getName().equals(existingMeal.getMeal().getName()) &&
                        OrderMealStatus.valueOf(incomingMeal.getStatus()).equals(existingMeal.getStatus()));
    }

    private BigDecimal calculatePrice(Meal meal, Integer quantity) {
        return meal.getPrice().multiply(BigDecimal.valueOf(quantity));
    }

    private List<OrderMeal> combineMeals(List<OrderMeal> updatedMeals, List<OrderMeal> newMeals) {
        List<OrderMeal> combinedMeals = new ArrayList<>(updatedMeals);
        combinedMeals.addAll(newMeals);
        return combinedMeals;
    }
}

