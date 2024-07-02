package com.example.RestaurantManagementSystem.api.rest;

import com.example.RestaurantManagementSystem.api.rest.request.AddMealRequest;
import com.example.RestaurantManagementSystem.business.MealService;
import com.example.RestaurantManagementSystem.domain.Meal;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
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
@RequestMapping("/api/admin")
public class MealController {
    private final MealService mealService;

    @PostMapping(value = "/meal", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addMeal(
            @Valid @RequestPart("meal") AddMealRequest request,
            @RequestPart("image") MultipartFile image) {
        mealService.addMeal(request, image);
        return ResponseEntity.ok("test");
    }

    @PatchMapping(value = "/meal", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateMeal(
            @Valid @RequestPart("meal") AddMealRequest request,
            @RequestPart("image") MultipartFile image) {
        mealService.updateMeal(request, image);
        return ResponseEntity.ok("test");
    }

    @GetMapping("/meals")
    public ResponseEntity<List<Meal>> meals(
            @RequestParam String restaurantName,
            @RequestParam String category
    ) {
        return ResponseEntity.ok(mealService.findByCategory(restaurantName, category));
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
        mealService.deleteMeal(name,restaurantName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/meal/mealOfTheDay")
    public void setMealOfTheDay(@RequestParam String restaurantName, @RequestParam String name) {
        mealService.setMealOfTheDay(restaurantName, name);
    }

}
