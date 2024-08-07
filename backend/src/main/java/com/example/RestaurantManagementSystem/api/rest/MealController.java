package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.request.MealRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.MealPaginationService;
import com.example.RestaurantManagementSystem.business.MealService;
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

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class MealController {
    private final MealService mealService;
    private final MealPaginationService mealPaginationService;

    @PostMapping(value = "/meal", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response> addMeal(
            @Valid @RequestPart("meal") MealRequest request,
            @RequestPart("image") MultipartFile image) {
        return ResponseEntity.ok(mealService.addMeal(request, image));
    }

    @PatchMapping(value = "/meal", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response> updateMeal(
            @RequestPart("meal") MealRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(mealService.updateMeal(request, image));
    }

    @GetMapping("/meals")
    public ResponseEntity<Page<Meal>> meals(
            @RequestParam String restaurantName,
            @RequestParam String category,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @RequestParam(required = false) String searchTerm
    ) {
        return ResponseEntity.ok(mealPaginationService
                .findAllByCategory(restaurantName, category, pageNumber, pageSize, searchTerm));
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage(@RequestParam String image) throws IOException {
        Resource resource = new ClassPathResource("/static/images/" + image);
        byte[] imageBytes = Files.readAllBytes(Path.of(resource.getURI()));
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
    }

    @GetMapping("/meal")
    public ResponseEntity<Meal> getMeal(@RequestParam String restaurantName, @RequestParam String name) {
        return ResponseEntity.ok(mealService.getMeal(restaurantName, name));
    }

    @PutMapping("/meal")
    public ResponseEntity<Object> deleteMeal(@RequestParam String restaurantName, @RequestParam String name) {
        mealService.deleteMeal(name, restaurantName);
        return ResponseEntity.ok(mealService.deleteMeal(name, restaurantName));
    }

    @PatchMapping("/meal/mealOfTheDay")
    public void setMealOfTheDay(@RequestParam String restaurantName, @RequestParam String name) {
        mealService.setMealOfTheDay(restaurantName, name);
    }

}
