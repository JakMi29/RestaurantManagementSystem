package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface WaiterDAO {
    Waiter createWaiter(Waiter waiter);

    Optional<Waiter> findByEmail(String email);
    Optional<Waiter> findByEmailWithUser(String email);

    Waiter updateWaiter(Waiter waiter);

    Page<Waiter> findAllByRestaurant(Restaurant restaurant, Pageable page);

    Page<Waiter> findAllByRestaurantAndSearchTerms(Restaurant restaurant, Pageable page, String searchTerm);
}
