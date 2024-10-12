package com.example.RestaurantManagementSystem.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Value
@With
@Builder
@EqualsAndHashCode(of = "email")
public class Waiter {
    Integer id;
    String email;
    User user;
    OffsetDateTime employmentDate;
    BigDecimal salary;
    List<Order> orders;
    Restaurant restaurant;
}
