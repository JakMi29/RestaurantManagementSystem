package com.example.RestaurantManagementSystem.domain;

import com.example.RestaurantManagementSystem.infrastructure.security.Role;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;

@Value
@With
@Builder
@EqualsAndHashCode
public class User {
    Integer id;
    String name;
    String surname;
    String phone;
    String email;
    Boolean active;
    Role role;
    String password;
}
