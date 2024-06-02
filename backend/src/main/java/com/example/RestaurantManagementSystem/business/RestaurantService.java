package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.business.dao.RestaurantDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RestaurantService  {
    private final RestaurantDAO restaurantDAO;

@Transactional
public Restaurant findByName(String name){
    return restaurantDAO.findByName(name);
}
    @Transactional
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantDAO.createRestaurant(restaurant);
    }
}
