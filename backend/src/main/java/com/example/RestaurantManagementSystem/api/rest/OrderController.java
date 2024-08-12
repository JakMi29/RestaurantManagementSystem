package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class OrderController {
    private final OrderService orderService;

    private SimpMessagingTemplate template;

    @PatchMapping("/order/edit")
        public OrderDTO editOrder(@RequestParam String orderNumber){
        OrderDTO order = orderService.edit(orderNumber);

        this.template.convertAndSend("/topic/orders", order);

        return order;
        }

    @PostMapping("/order")
    public OrderDTO createOrder(
            @RequestBody CreateOrderRequest request) {

        OrderDTO order = orderService.createOrder(request);
        System.out.println(order);
        this.template.convertAndSend("/topic/orders", order);

        return order;
    }

    @PatchMapping("/order")
    public Response updateOrderMeal(
            @RequestParam String mealName,
            @RequestParam String restaurantName,
            @RequestParam String orderNumber
    ) {
        OrderDTO order = orderService.updateOrderMeal(restaurantName, mealName, orderNumber);
        this.template.convertAndSend("/topic/orders", order);

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully update order")
                .build();

    }

    @PatchMapping("/order/status")
    public Response changeStatus(@RequestParam String orderNumber) {
        return orderService.changeStatus(orderNumber);
    }
}
