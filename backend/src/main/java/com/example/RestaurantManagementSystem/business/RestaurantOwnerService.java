package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.business.dao.RestaurantOwnerDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.RestaurantOwner;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RestaurantOwnerService {
    private final RestaurantOwnerDAO restaurantOwnerDAO;
    private final RestaurantService restaurantService;

    @Transactional
    public void createRestaurantOwner(String email,String restaurantName){
        RestaurantOwner restaurantOwner=restaurantOwnerDAO.createRestaurantOwner(email);
        Restaurant restaurant=Restaurant.builder()
                .name(restaurantName)
                .restaurantOwner(restaurantOwner)
                .build();
        restaurantService.createRestaurant(restaurant);
    }
}
