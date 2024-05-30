package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.request.AddMealRequest;
import com.example.RestaurantManagementSystem.business.MealService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final MealService mealService;

    @PostMapping(value = "/addMeal",consumes={MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addMeal(
            @Valid @RequestPart("meal") AddMealRequest request,
            @RequestPart("image") MultipartFile image)
    {
        mealService.addMeal(request,image);
        return ResponseEntity.ok("test");
    }
}
