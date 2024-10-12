package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.DailyOrdersStatisticsDTO;
import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.api.dto.OrdersStatisticDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.OrderDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

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

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public OrderDTO updateOrder(OrderDTO updatedOrder) {
        Order order = orderDAO.findByNumber(updatedOrder.getNumber());
        this.updateMeals(order, updatedOrder);
        orderDAO.updateOrder(order
                .withEdit(false)
                .withEditor(null)
                .withCustomerQuantity(updatedOrder.getCustomerQuantity())
                .withPrice(updatedOrder.getPrice()));
        entityManager.flush();
        entityManager.clear();
        return mapper.map(orderDAO.findByNumber(updatedOrder.getNumber()), false);
    }

    @Transactional
    public void updateMeals(Order order, OrderDTO updatedOrder) {
        orderMealService.updateOrderMeals(order, updatedOrder.getMeals());
    }

    @Transactional
    public OrderDTO updateAndGetOrder(String restaurantName, String mealName, String orderNumber, String orderMealStatus) {
        this.updateOrderMeal(restaurantName, mealName, orderNumber, orderMealStatus);
        Order order = orderDAO.findByNumber(orderNumber);
        if (this.checkOrderStatus(order)) {
            this.changeStatus(order);
        }
        return mapper.map(order, false);
    }

    private Boolean checkOrderStatus(Order order) {
        List<OrderMeal> orderMeals = order.getOrderMeals();
        Map<OrderMealStatus, List<OrderMeal>> mealByStatus = orderMeals.stream()
                .collect(Collectors.groupingBy(OrderMeal::getStatus));
        return mealByStatus.size() == 1 && mealByStatus.containsKey(OrderMealStatus.RELEASED);
    }

    @Transactional
    private void updateOrderMeal(String restaurantName, String mealName, String orderNumber, String orderMealStatus) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Order order = orderDAO.findByNumber(orderNumber);
        orderMealService.updateStatus(mealName, restaurant, order, OrderMealStatus.valueOf(orderMealStatus));
    }

    //    @Transactional
//    public Response updateOrder(UpdateOrderRequest request) {
//        Order order = orderDAO.findByNumber(request.getOrderNumber());
//        orderMealService.updateStatus(mealName, restaurant, order);
//        if (order.getOrderMeals().stream().filter(o -> o.getStatus() == OrderMealStatus.PREPARING).toList().size() == 1) {
//            orderDAO.updateOrder(order);
//        }
//
//        return Response.builder()
//                .code(HttpStatus.OK.value())
//                .message("Successfully update order")
//                .build();
//    }
    @Transactional
    public OrderDTO createOrder(CreateOrderRequest request) {
        Waiter waiter = waiterService.findByEmail(request.getWaiterEmail());
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Table table = tableService.findByNameAndRestaurant(request.getTableName(), request.getRestaurantName())
                .orElseThrow(()->new RuntimeException("Something gone wrong"));
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
        return mapper.map(orderDAO.createOrder(order), false);

    }
//    @Transactional
//    public Response createOrder(CreateOrderRequest request) {
//        Waiter waiter = waiterService.findByEmail(request.getEmail());
//        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
//        List<OrderMeal> orderMeals = prepareOrderMeals(request.getMeals(), restaurant);
//        OffsetDateTime time = OffsetDateTime.now();
//        Order order = Order.builder()
//                .restaurant(restaurant)
//                .status(OrderStatus.PLACED)
//                .number(OrderNumberGenerator.generateOrderNumber(time))
//                .waiter(waiter)
//                .receivedDateTime(time)
//                .price(calculatePrice(orderMeals))
//                .build();
//
//        orderMeals = orderMeals.stream().map(c -> c.withOrder(order)).collect(Collectors.toList());
//        orderDAO.createOrder(order.withOrderMeals(orderMeals));
//        log.info("Successful create order: %s".formatted(order.getNumber()));
//        return Response.builder()
//                .message("Successful create order: %s")
//                .code(HttpStatus.OK.value())
//                .build();
//    }

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
        this.changeStatus(order);

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change order status")
                .build();
    }

    private Order changeStatus(Order order) {
        Order updatedOrder = order.withStatus(
                switch (order.getStatus()) {
                    case NEW -> OrderStatus.PLACED;
                    case PLACED -> OrderStatus.RELEASED;
                    case RELEASED -> OrderStatus.PAID;
                    case PAID -> null;
                });
        if (updatedOrder.getStatus() == OrderStatus.PAID) {
            updatedOrder = updatedOrder.withCompletedDateTime(OffsetDateTime.now());
        }
        orderDAO.updateOrder(updatedOrder);
        return updatedOrder;
    }

    @Transactional
    public Optional<Order> getOrderByTableAndNotStatus(Table table, OrderStatus status) {
        return orderDAO.findByTableAndNotByStatus(table, status);
    }

    @Transactional
    public OrderDTO edit(String orderNumber, String email, Boolean edit) {
        Lock lock = orderLocks.computeIfAbsent(orderNumber, k -> new ReentrantLock());

        lock.lock();
        try {
            Waiter waiter = waiterService.findByEmail(email);
            Order order = orderDAO.findByNumber(orderNumber);
            if (edit) {
                if (order.getEdit()) {
                    throw new ObjectAlreadyExist("Someone else is editing this order!");
                }
                order = order.withEdit(true).withEditor(waiter);
            } else {
                if (!order.getEdit()) {
                    throw new RuntimeException("Something gone wrong!");
                }
                if (!order.getEditor().getEmail().equals(email)) {
                    throw new ObjectAlreadyExist("You are not order editor!");
                }
                order = order.withEdit(false).withEditor(null);
            }

            return mapper.map(orderDAO.updateOrder(order), true);
        } finally {
            lock.unlock();
            orderLocks.remove(orderNumber);
        }
    }

    @Transactional
    public Page<OrderDTO> findAllByPeriod(String restaurantName, String period, Pageable pageable) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);
        return orderDAO.findAllByPeriod(restaurant, startDate, endDate, pageable).map(order -> mapper.map(order, false));
    }


    private OffsetDateTime getStartPeriod(String period, OffsetDateTime endDate) {
        switch (period.toLowerCase()) {
            case "today":
                return endDate.truncatedTo(ChronoUnit.DAYS);
            case "3days":
                return endDate.minusDays(3).truncatedTo(ChronoUnit.DAYS);
            case "7days":
                return endDate.minusDays(7).truncatedTo(ChronoUnit.DAYS);
            case "1month":
                return endDate.minusMonths(1).truncatedTo(ChronoUnit.DAYS);
            case "3months":
                return endDate.minusMonths(3).truncatedTo(ChronoUnit.DAYS);
            case "1year":
                return endDate.minusYears(1).truncatedTo(ChronoUnit.DAYS);
            case "all":
            default:
                return OffsetDateTime.of(2000, 1, 1, 0, 0, 0, 0, ZoneOffset.UTC);
        }
    }

    public OrderDTO findByNumber(String number) {
        return mapper.map(orderDAO.findByNumber(number), false);
    }
}