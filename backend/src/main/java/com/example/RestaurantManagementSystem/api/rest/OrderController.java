package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<Response> createOrder(
            @RequestBody CreateOrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @PatchMapping("/order")
    public ResponseEntity<Response> updateOrder(
            @RequestParam String mealName,
            @RequestParam String restaurantName,
            @RequestParam String orderNumber
    ) {
        return ResponseEntity.ok(orderService.updateOrder(restaurantName, mealName, orderNumber));
    }

    @PatchMapping("/order")
    public ResponseEntity<Response> updateOrderMeal(
            @RequestParam String mealName,
            @RequestParam String restaurantName,
            @RequestParam String orderNumber
    ) {
        return ResponseEntity.ok(orderService.updateOrder(restaurantName, mealName, orderNumber));
    }

    @PatchMapping("/order/status")
    public Response changeStatus(@RequestParam String orderNumber) {
        return orderService.changeStatus(orderNumber);
    }
}
