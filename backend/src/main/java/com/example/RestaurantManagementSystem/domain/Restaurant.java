package com.example.RestaurantManagementSystem.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.With;

@Value
@With
@Builder
@EqualsAndHashCode
public class Restaurant {
    Integer id;
    String name;
    RestaurantOwner restaurantOwner;
}
