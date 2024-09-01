package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.MealsStatisticDTO;
import com.example.RestaurantManagementSystem.api.dto.OrdersStatisticDTO;
import com.example.RestaurantManagementSystem.api.dto.TableOrderMealDTO;
import com.example.RestaurantManagementSystem.business.OrderStatisticService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/statistics")
public class StatisticsController {
    private final OrderStatisticService orderStatisticService;

    @GetMapping("/orders")
    public ResponseEntity<OrdersStatisticDTO> getOrderStatistics(
            @RequestParam String restaurantName,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(orderStatisticService.getOrdersStatistics(restaurantName,period));
    }
    @GetMapping("/meals")
    public ResponseEntity<MealsStatisticDTO> getMealsStatistics(
            @RequestParam String restaurantName,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(orderStatisticService.getMealsStatistics(restaurantName,period));
    }

    @GetMapping("table/meals")
    public ResponseEntity<List<TableOrderMealDTO>> getWAITERStatistics(
            @RequestParam String restaurantName,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(orderStatisticService.getMeals(restaurantName,period));
    }
//    @GetMapping("/statistics/waiters")
//    public ResponseEntity<OrdersStatisticDTO> getWAITERStatistics(
//            @RequestParam String restaurantName,
//            @RequestParam String period
//    ) {
//        return ResponseEntity.ok(statisticOrder.getWaitersStatistics(restaurantName,period));
//    }


}
