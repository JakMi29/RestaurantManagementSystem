package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.api.dto.OrderMealDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.OrderDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExistException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;


@Slf4j
@Service
@AllArgsConstructor
public class OrderService {
    private final OrderDAO orderDAO;
    private final TableService tableService;
    private final RestaurantService restaurantService;
    private final WaiterService waiterService;
    private final OrderMealService orderMealService;
    private final OrderDTOMapper mapper;
    private final ConcurrentHashMap<String, Lock> orderLocks = new ConcurrentHashMap<>();

    @Transactional
    public Page<OrderDTO> findAllByPeriod(String restaurantName, String period, Pageable pageable) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);

        return orderDAO.findAllByPeriod(restaurant, startDate, endDate, pageable)
                .map(order -> mapper.map(order, false));
    }

    @Transactional
    public OrderDTO findByNumber(String number) {
        return mapper.map(orderDAO.findByNumber(number), false);
    }

    @Transactional
    public OrderDTO updateOrder(OrderDTO updatedOrder) {
        Order order = orderDAO.findByNumber(updatedOrder.getNumber());
        List<OrderMeal> meals = updateMeals(updatedOrder.getMeals(), order);
        Order updated = orderDAO.updateOrder(order
                        .withStatus(checkStatus(meals))
                .withOrderMeals(meals)
                .withEdit(false)
                .withEditor(null)
                .withCustomerQuantity(updatedOrder.getCustomerQuantity())
                .withPrice(calculateOrderPrice(meals)));

        log.info("Order:{} updated successfully", updatedOrder.getNumber());
        return mapper.map(updated, false);
    }

    private OrderStatus checkStatus(List<OrderMeal> meals) {
        if(meals.stream().anyMatch(meal-> meal.getStatus()!=OrderMealStatus.READY)){
            return OrderStatus.PLACED;
        }
        return OrderStatus.RELEASED;
    }

    @Transactional
    public OrderDTO edit(String orderNumber, String email, Boolean edit) {
        Lock lock = orderLocks.computeIfAbsent(orderNumber, k -> new ReentrantLock());
        lock.lock();

        try {
            Waiter waiter = waiterService.findByEmail(email);
            Order order = orderDAO.findByNumber(orderNumber);
            if (edit) {
                validateAndEnableEditing(order);
                order = order.withEdit(true).withEditor(waiter);
            } else {
                validateAndDisableEditing(order, email);
                order = order.withEdit(false).withEditor(null);
            }
            return mapper.map(orderDAO.updateOrder(order), true);
        } finally {
            lock.unlock();
            orderLocks.remove(orderNumber);
            log.info("Lock released for order number: {}", orderNumber);
        }
    }

    public List<OrderMeal> updateMeals(List<OrderMealDTO> meals, Order order) {
        return orderMealService.prepareOrderMeals(meals, order);
    }

    @Transactional
    public OrderDTO updateOrderMeal(String mealName, String orderNumber, String orderMealStatus) {
        Order order = orderDAO.findByNumber(orderNumber);
        order = order.withOrderMeals(orderMealService.updateMeal(order, mealName, orderMealStatus));
        if (checkIfOrderIsComplete(order))
            return changeStatus(order);
        return mapper.map(orderDAO.updateOrder(order), false);
    }

    @Transactional
    public OrderDTO createOrder(CreateOrderRequest request) {
        Waiter waiter = waiterService.findByEmail(request.getWaiterEmail());
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Table table = tableService.findByNameAndRestaurant(request.getTableName(), request.getRestaurantName())
                .orElseThrow(() -> new NotFoundException("Table not found"));

        OffsetDateTime time = OffsetDateTime.now();
        Order order = Order.builder()
                .restaurant(restaurant)
                .status(OrderStatus.PLACED)
                .number(OrderNumberGenerator.generateOrderNumber(time))
                .waiter(waiter)
                .editor(waiter)
                .table(table)
                .customerQuantity(0)
                .edit(true)
                .receivedDateTime(time)
                .price(BigDecimal.ZERO)
                .build();

        Order createdOrder = orderDAO.createOrder(order);
        return mapper.map(createdOrder, false);
    }

    private BigDecimal calculateOrderPrice(List<OrderMeal> orderMeals) {
        return orderMeals.stream()
                .map(meal -> meal.getMeal().getPrice().multiply(BigDecimal.valueOf(meal.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    public OrderDTO changeStatus(String orderNumber) {
        Order order = orderDAO.findByNumber(orderNumber);
        return this.changeStatus(order);
    }

    @Transactional
    private OrderDTO changeStatus(Order order) {
        OrderStatus newStatus = switch (order.getStatus()) {
            case NEW -> OrderStatus.PLACED;
            case PLACED -> OrderStatus.RELEASED;
            case RELEASED -> OrderStatus.PAID;
            case PAID -> null;
        };
        Order updatedOrder = order.withStatus(newStatus);
        if (newStatus == OrderStatus.PAID) {
            updatedOrder = updatedOrder.withCompletedDateTime(OffsetDateTime.now());
        }
        return mapper.map(orderDAO.updateOrder(updatedOrder), false);
    }

    private Boolean checkIfOrderIsComplete(Order order) {
        return order.getOrderMeals().stream()
                .allMatch(meal -> meal.getStatus().equals(OrderMealStatus.RELEASED));
    }

    private void validateAndEnableEditing(Order order) {
        if (order.getEdit()) {
            throw new ObjectAlreadyExistException("Someone else is editing this order!");
        }
    }

    private void validateAndDisableEditing(Order order, String email) {
        if (!order.getEdit() || !order.getEditor().getEmail().equals(email)) {
            throw new ObjectAlreadyExistException("Invalid editor permissions!");
        }
    }

    private OffsetDateTime getStartPeriod(String period, OffsetDateTime endDate) {
        return switch (period.toLowerCase()) {
            case "today" -> endDate.truncatedTo(ChronoUnit.DAYS);
            case "3days" -> endDate.minusDays(3).truncatedTo(ChronoUnit.DAYS);
            case "7days" -> endDate.minusDays(7).truncatedTo(ChronoUnit.DAYS);
            case "1month" -> endDate.minusMonths(1).truncatedTo(ChronoUnit.DAYS);
            case "3months" -> endDate.minusMonths(3).truncatedTo(ChronoUnit.DAYS);
            case "1year" -> endDate.minusYears(1).truncatedTo(ChronoUnit.DAYS);
            case "all" -> OffsetDateTime.of(2000, 1, 1, 0, 0, 0, 0, ZoneOffset.UTC);
            default -> throw new IllegalArgumentException("Invalid period: " + period);
        };
    }
}
