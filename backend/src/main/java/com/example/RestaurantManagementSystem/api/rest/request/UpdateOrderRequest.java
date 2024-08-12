package com.example.RestaurantManagementSystem.api.rest.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.Map;

@Data
@Builder
@Validated
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderRequest {
    String orderNumber;
    Integer customersQuantity;
    Map<String, Integer> meals;
}
