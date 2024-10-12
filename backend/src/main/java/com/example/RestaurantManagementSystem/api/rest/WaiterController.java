package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.WaitersDTO;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.api.rest.request.MealRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.MealPaginationService;
import com.example.RestaurantManagementSystem.business.MealService;
import com.example.RestaurantManagementSystem.business.WaiterPaginationService;
import com.example.RestaurantManagementSystem.business.WaiterService;
import com.example.RestaurantManagementSystem.domain.Meal;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/waiters")
public class WaiterController {
    private final WaiterService waiterService;
    private final WaiterPaginationService waiterPaginationService;

    @PostMapping(value = "/admin")
    public ResponseEntity<WaiterDTO> addWaiter(
            @RequestBody CreateWaiterRequest request) {
        return ResponseEntity.ok(waiterService.createWaiter(request));
    }

    @PutMapping(value = "/admin")
    public ResponseEntity<WaiterDTO> updateWaiter(
            @RequestBody CreateWaiterRequest request) {
        return ResponseEntity.ok(waiterService.updateWaiter(request));
    }

    @PatchMapping(value = "/admin")
    public ResponseEntity<WaiterDTO> deleteWaiter(
            @RequestParam String email) {
        return ResponseEntity.ok(waiterService.deleteWaiter(email));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<WaiterDTO>> waiters(
            @RequestParam String restaurantName,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @RequestParam(required = false) String searchTerm
    ) {
        return ResponseEntity.ok(waiterPaginationService
                .findAll(restaurantName, pageNumber, pageSize, searchTerm));
    }
}
