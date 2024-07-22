package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.TableService;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class TableController {
    private final TableService tableService;

    @GetMapping("/tables")
    public ResponseEntity<List<Table>> tables(@RequestParam String restaurantName) {
        return ResponseEntity.ok(tableService.findAllTablesByRestaurant(restaurantName));
    }

    @PatchMapping("/tables")
    public Response changeStatus(@RequestParam String tableName, @RequestParam String restaurantName){
        return tableService.changeStatus(tableName, restaurantName);
    }
}
