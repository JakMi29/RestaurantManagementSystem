package com.example.RestaurantManagementSystem.api.auth;

import com.example.RestaurantManagementSystem.infrastructure.security.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String email;
    private Role role;
    private String restaurantName;
}
