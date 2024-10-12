package com.example.RestaurantManagementSystem.api.rest.request;

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
    String oldEmail;
    String salary;
    String email;
    String restaurantName;
    String name;
    String surname;
    String phone;
    String password;
}
