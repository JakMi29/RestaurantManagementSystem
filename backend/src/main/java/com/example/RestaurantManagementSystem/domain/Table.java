package com.example.RestaurantManagementSystem.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

import java.math.BigDecimal;

@Value
@With
@Builder
@EqualsAndHashCode
public class Table {
    Integer id;
    String name;
    TableStatus status;
    Restaurant restaurant;
}
