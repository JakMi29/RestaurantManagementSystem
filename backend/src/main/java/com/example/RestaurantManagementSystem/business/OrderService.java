package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class OrderService {
    private final OrderDAO orderDAO;
    private final RestaurantService restaurantService;
    private final WaiterService waiterService;
    private final OrderMealService orderMealService;

    @Transactional
    public Response updateOrder(String restaurantName, String mealName, String orderNumber) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Order order = orderDAO.findByNumber(orderNumber);
        orderMealService.updateStatus(mealName, restaurant, order);
        if (order.getOrderMeals().stream().filter(o -> o.getStatus() == OrderMealStatus.PREPARING).toList().size() == 1) {
            orderDAO.updateOrder(order);
        }

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully update order")
                .build();
    }

    @Transactional
    public Response createOrder(CreateOrderRequest request) {
        Waiter waiter = waiterService.findByEmail(request.getEmail());
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        List<OrderMeal> orderMeals = prepareOrderMeals(request.getMeals(), restaurant);
        OffsetDateTime time = OffsetDateTime.now();
        Order order = Order.builder()
                .restaurant(restaurant)
                .status(OrderStatus.PLACED)
                .number(OrderNumberGenerator.generateOrderNumber(time))
                .waiter(waiter)
                .receivedDateTime(time)
                .price(calculatePrice(orderMeals))
                .build();

        orderMeals = orderMeals.stream().map(c -> c.withOrder(order)).collect(Collectors.toList());
        orderDAO.createOrder(order.withOrderMeals(orderMeals));
        log.info("Successful create order: %s".formatted(order.getNumber()));
        return Response.builder()
                .message("Successful create order: %s")
                .code(HttpStatus.OK.value())
                .build();
    }

    private BigDecimal calculatePrice(List<OrderMeal> orderMeals) {
        return orderMeals.stream()
                .map(meal -> meal.getMeal().getPrice().multiply(BigDecimal.valueOf((meal.getQuantity()))))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private List<OrderMeal> prepareOrderMeals(Map<String, Integer> mapOfMeals, Restaurant restaurant) {
        return mapOfMeals.entrySet().stream()
                .filter(entry -> !entry.getValue().equals(0))
                .map(entry -> orderMealService.prepareOrderMeal(entry, restaurant))
                .collect(Collectors.toList());
    }

    @Transactional
    public Response changeStatus(String orderNumber) {
        Order order = orderDAO.findByNumber(orderNumber);
        orderDAO.updateOrder(order.withStatus(
                switch (order.getStatus()) {
                    case PLACED -> OrderStatus.RELEASED;
                    case RELEASED -> OrderStatus.PAID;
                    case PAID -> null;
                }));

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change order status")
                .build();
    }

    @Transactional
    public Order getOrderByTableAndNotStatus(Table table, OrderStatus status) {
        return orderDAO.findByTableAndNotByStatus(table, status);
    }
}
