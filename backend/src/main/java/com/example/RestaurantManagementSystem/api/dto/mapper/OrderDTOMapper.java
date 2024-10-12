package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import com.example.RestaurantManagementSystem.domain.OrderMealStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;

@Component
@AllArgsConstructor
public class OrderDTOMapper {
    private final WaiterDTOMapper waiterDTOMapper;
    private final OrderMealDTOMapper orderMealDTOMapper;
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public OrderDTO map(Order order, Boolean edit) {
        return OrderDTO.builder()
                .price(order.getPrice())
                .number(order.getNumber())
                .status(order.getStatus().toString())
                .edit(order.getEdit())
                .customerQuantity(order.getCustomerQuantity())
                .tableName(order.getTable().getName())
                .completedDateTime(order.getCompletedDateTime() != null
                        ? order.getCompletedDateTime().format(dateTimeFormatter)
                        : null)
                .receivedDateTime(order.getReceivedDateTime() != null
                        ? order.getReceivedDateTime().format(dateTimeFormatter)
                        : null)
                .durationTime(
                        order.getCompletedDateTime() != null && order.getCompletedDateTime() != null ?
                                String.valueOf(
                                        Duration.between(
                                                        order.getReceivedDateTime(),
                                                        order.getCompletedDateTime())
                                                .toMinutes()) : null)
                .waiter(waiterDTOMapper.map(order.getWaiter()))
                .editor(order.getEditor() != null ? waiterDTOMapper.map(order.getEditor()) : null)
                .meals(order.getOrderMeals().stream().sorted(Comparator
                        .comparing(OrderMeal::getStatus, Comparator.comparingInt(edit ? this::mapStatusOrderMealEdit : this::mapStatusOrderMeal))
                        .thenComparing(orderMeal -> orderMeal.getMeal().getName())
                ).map(orderMealDTOMapper::map).toList())
                .build();
    }

    private int mapStatusOrderMeal(OrderMealStatus status) {
        return switch (status) {
            case READY -> 0;
            case PREPARING -> 1;
            case RELEASED -> 2;
            case NEW -> 3;
        };
    }

    private int mapStatusOrderMealEdit(OrderMealStatus status) {
        return switch (status) {
            case NEW -> 0;
            case PREPARING -> 1;
            case READY -> 2;
            case RELEASED -> 3;
        };
    }
}
