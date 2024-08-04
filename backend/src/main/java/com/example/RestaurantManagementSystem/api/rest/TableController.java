package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.OrderService;
import com.example.RestaurantManagementSystem.business.TableService;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/tables")
public class TableController {
    private final TableService tableService;
    private final OrderService orderService;
    private SimpMessagingTemplate template;
    @GetMapping()
    public ResponseEntity<List<Table>> tables(@RequestParam String restaurantName) {
        return ResponseEntity.ok(tableService.findAllTablesByRestaurant(restaurantName));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<TableDTO>> tablesWithActiveOrders(@RequestParam String restaurantName) {
        return ResponseEntity.ok(tableService.findTablesByRestaurant(restaurantName));
    }

    @PatchMapping()
    public Response changeStatus(@RequestParam String tableName, @RequestParam String restaurantName) {
        TableDTO table=tableService.changeStatus(tableName,restaurantName);
        this.template.convertAndSend("/topic/tables", table);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change table status")
                .build();
    }
}
