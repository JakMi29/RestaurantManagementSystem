package com.example.RestaurantManagementSystem.api.rest.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@Builder
@Validated
@AllArgsConstructor
@NoArgsConstructor
public class CreateWaiterRequest {
    @NotBlank
    @Email
    String oldEmail;
    @NotBlank
    String salary;
    @NotBlank
    @Email
    String email;
    @NotBlank
    String restaurantName;
    @NotBlank
    String name;
    @NotBlank
    String surname;
    @NotBlank
    @Pattern(regexp = "^[+]\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{3}$")
    String phone;
    @NotBlank
    String password;
}
