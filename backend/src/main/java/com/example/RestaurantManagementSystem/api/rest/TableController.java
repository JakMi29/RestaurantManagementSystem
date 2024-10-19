package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.TablePaginationService;
import com.example.RestaurantManagementSystem.business.TableService;
import com.example.RestaurantManagementSystem.business.TableWithOrderService;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/table")
public class TableController {
    private final TableService tableService;
    private final TablePaginationService tablePaginationService;
    private final TableWithOrderService tableWithOrderService;
    private SimpMessagingTemplate template;

    @GetMapping
    public ResponseEntity<List<Table>> tables(@RequestParam String restaurantName) {
        return ResponseEntity.ok(tableService.findAllTablesByRestaurant(restaurantName));
    }

    @GetMapping("/orders")
    public ResponseEntity<Page<TableDTO>> tablesWithActiveOrders(
            @RequestParam String restaurantName,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @RequestParam(required = false) String searchTerm
    ) {
        return ResponseEntity.ok(tablePaginationService.findAll(restaurantName, pageNumber, pageSize, searchTerm));
    }

    @PatchMapping("/waiter")
    public Response changeStatus(
            @RequestParam String tableName,
            @RequestParam String restaurantName,
            @RequestParam(required = false) boolean reverse

    ) {
        TableDTO table = tableService.changeStatus(tableName, restaurantName,reverse);
        this.template.convertAndSend("/topic/tables", table);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change table status")
                .build();
    }

    @PostMapping("/admin")
    public Response createTable(
            @RequestParam String tableName,
            @RequestParam String restaurantName) {
        tableService.createTable(tableName, restaurantName);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully create table")
                .build();
    }

    @PutMapping("/admin")
    public Response updateTable(
            @RequestParam String tableName,
            @RequestParam String oldTableName,
            @RequestParam String restaurantName) {
        tableService.updateTable(tableName, oldTableName, restaurantName);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change table name")
                .build();
    }

    @PatchMapping("/admin")
    public Response deleteTable(
            @RequestParam String restaurantName,
            @RequestParam String tableName) {
        tableWithOrderService.deleteTable(tableName, restaurantName);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully delete table")
                .build();
    }
}
