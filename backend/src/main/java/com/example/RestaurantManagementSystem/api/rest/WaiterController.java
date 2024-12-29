package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.WaiterPaginationService;
import com.example.RestaurantManagementSystem.business.WaiterService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/waiters")
public class WaiterController {
    private final WaiterService waiterService;
    private final WaiterPaginationService waiterPaginationService;

    @PostMapping(value = "/admin")
    public Response addWaiter(
            @RequestBody CreateWaiterRequest request) {
        WaiterDTO waiter = waiterService.createWaiter(request);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Waiter %s %s added successfully.".formatted(waiter.getName(), waiter.getSurname())))
                .build();
    }

    @PutMapping(value = "/admin")
    public Response updateWaiter(
            @RequestBody CreateWaiterRequest request) {
        WaiterDTO waiter = waiterService.updateWaiter(request);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Waiter %s %s updated successfully.".formatted(waiter.getName(), waiter.getSurname())))
                .build();
    }

    @PatchMapping(value = "/admin")
    public Response deleteWaiter(
            @RequestParam String email) {
        WaiterDTO waiter = waiterService.deleteWaiter(email);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Waiter %s %s deleted successfully.".formatted(waiter.getName(), waiter.getSurname())))
                .build();
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
