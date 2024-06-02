package com.example.RestaurantManagementSystem.api.rest.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@Builder
@Validated
@AllArgsConstructor
@NoArgsConstructor
public class AddMealRequest {
    @NotBlank
    private String restaurantName;
    @NotBlank
    private String name;
    @NotBlank
    private String category;
    @NotBlank
    private String description;
    @NotBlank
    private String price;
}
