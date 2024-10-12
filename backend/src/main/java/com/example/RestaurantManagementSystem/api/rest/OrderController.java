package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import com.example.RestaurantManagementSystem.api.dto.OrdersStatisticDTO;
import com.example.RestaurantManagementSystem.api.rest.request.CreateOrderRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.OrderPaginationService;
import com.example.RestaurantManagementSystem.business.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/order")
public class OrderController {
    private final OrderService orderService;
    private final OrderPaginationService orderPaginationService;

    private SimpMessagingTemplate template;

    @PatchMapping("/waiter/edit")
    public OrderDTO editOrder(@RequestParam String orderNumber, @RequestParam String editor, @RequestParam Boolean edit) {
        OrderDTO order = orderService.edit(orderNumber, editor, edit);

        this.template.convertAndSend("/topic/orders", order);

        return order;
    }

    @PutMapping("/waiter/update")
    public ResponseEntity<OrderDTO> editOrder(@RequestBody OrderDTO order) {
        OrderDTO orderDTO = orderService.updateOrder(order);

        this.template.convertAndSend("/topic/orders", order);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Page<OrderDTO>> getOrders(
            @RequestParam String restaurantName,
            @RequestParam String period,
            @RequestParam Integer pageSize,
            @RequestParam Integer pageNumber
    ) {
        return ResponseEntity.ok(orderPaginationService.findAllByPeriod(restaurantName, period, pageSize, pageNumber));
    }

    @GetMapping
    public ResponseEntity<OrderDTO> getOrder(
            @RequestParam String number
    ) {
        return ResponseEntity.ok(orderService.findByNumber(number));
    }

    @PostMapping("/waiter")
    public OrderDTO createOrder(
            @RequestBody CreateOrderRequest request) {

        OrderDTO order = orderService.createOrder(request);
        this.template.convertAndSend("/topic/orders", order);

        return order;
    }

    @PatchMapping("/waiter/meal")
    public Response updateOrderMeal(
            @RequestParam String mealName,
            @RequestParam String restaurantName,
            @RequestParam String orderNumber,
            @RequestParam String status
    ) {
        OrderDTO order = orderService.updateAndGetOrder(restaurantName, mealName, orderNumber, status);
        this.template.convertAndSend("/topic/orders", order);

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully update order")
                .build();
    }

    @PatchMapping("/waiter/status")
    public Response changeStatus(@RequestParam String orderNumber) {
        return orderService.changeStatus(orderNumber);
    }
}
