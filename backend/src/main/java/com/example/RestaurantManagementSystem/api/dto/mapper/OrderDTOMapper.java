package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.domain.Order;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderDTOMapper {
    private final WaiterDTOMapper waiterDTOMapper;
    private final OrderMealDTOMapper orderMealDTOMapper;

    public OrderDTO map(Order order) {
        return OrderDTO.builder()
                .waiter(waiterDTOMapper.map(order.getWaiter()))
                .price(order.getPrice().toString())
                .number(order.getNumber())
                .status(order.getStatus().toString())
                .meals(order.getOrderMeals().stream().map(orderMealDTOMapper::map).toList())
                .build();
    }
}
