package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.*;
import com.example.RestaurantManagementSystem.business.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/admin/statistics")
public class StatisticsController {
    private final OrderStatisticService orderStatisticService;
    private final MealsStatisticService mealStatisticService;
    private final WaiterStatisticService waiterStatisticService;
    private final StatisticsPaginationService statisticsPaginationService;

    @GetMapping("/orders")
    public ResponseEntity<OrdersStatisticDTO> getOrderStatistics(
            @RequestParam String restaurantName,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(orderStatisticService.getOrdersStatistics(restaurantName, period));
    }

    @GetMapping("/meals")
    public ResponseEntity<MealsStatisticDTO> getMealsStatistics(
            @RequestParam String restaurantName,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(mealStatisticService.getMealsStatistics(restaurantName, period));
    }

    @GetMapping("table/meals")
    public ResponseEntity<Page<TableOrderMealDTO>> getOrderMealsStatistics(
            @RequestParam String restaurantName,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(statisticsPaginationService.getMealsByPeriod(restaurantName, period,pageSize,pageNumber));
    }

    @GetMapping("/waiters")
    public ResponseEntity<Page<WaitersDTO>> getWaiterStatistics(
            @RequestParam String restaurantName,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @RequestParam(required = false) String searchTerm,
            @RequestParam String period
            ) {
        return ResponseEntity.ok(statisticsPaginationService.findAll(restaurantName, pageNumber, pageSize, searchTerm, period));
    }

    @GetMapping("/waiter")
    public ResponseEntity<WaiterDailyStatisticsDTO> getTablesStatistics(
            @RequestParam String email,
            @RequestParam String period
    ) {
        return ResponseEntity.ok(waiterStatisticService.getWaiterStatistics(email, period));
    }


}
