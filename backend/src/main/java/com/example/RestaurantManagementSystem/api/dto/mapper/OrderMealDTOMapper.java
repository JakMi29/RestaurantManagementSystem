package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.OrderMealDTO;
import com.example.RestaurantManagementSystem.domain.OrderMeal;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMealDTOMapper {

    private final MealDTOMapper mealDTOMapper;

    public OrderMealDTO map(OrderMeal orderMeal) {
        return OrderMealDTO.builder()
                .meal(mealDTOMapper.mapOrderMeal(orderMeal.getMeal()))
                .status(orderMeal.getStatus().toString())
                .quantity(orderMeal.getQuantity())
                .build();
    }

}
