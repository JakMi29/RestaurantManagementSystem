package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.WaitersDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.WaiterDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.business.dao.UserDAO;
import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;


@Component
@AllArgsConstructor
public class WaiterService {
    private final RestaurantService restaurantService;
    private final WaiterDTOMapper mapper;
    private WaiterDAO waiterDAO;
    private UserDAO userDAO;

    @Transactional
    public Waiter findByEmail(String email) {
        return waiterDAO.findByEmail(email);
    }


    @Transactional
    public Page<WaiterDTO> findAll(
            String restaurantName,
            Pageable page,
            String searchTerm) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Page<Waiter> waiters;
        if (searchTerm != null) {
            waiters = waiterDAO.findAllByRestaurantAndSearchTerms(restaurant, page, searchTerm);
        } else {
            waiters = waiterDAO.findAllByRestaurant(restaurant, page);
        }
        return waiters.map(mapper::mapWithUserData);
    }


    @Transactional
    public WaiterDTO createWaiter(CreateWaiterRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Waiter waiter = this.buildWaiter(request, restaurant);
        return mapper.map(waiterDAO.createWaiter(waiter));
    }

    @Transactional
    public WaiterDTO updateWaiter(CreateWaiterRequest request) {
        Waiter waiter = waiterDAO.findByEmail(request.getOldEmail());
        return mapper.map(waiterDAO.updateWaiter(waiter));
    }

    @Transactional
    public WaiterDTO deleteWaiter(String email) {
        Waiter waiter = waiterDAO.findByEmail(email);
        return mapper.map(waiterDAO.updateWaiter(waiter));
    }

    private Waiter buildWaiter(CreateWaiterRequest request, Restaurant restaurant) {
        return Waiter.builder()
                .restaurant(restaurant)
                .email(request.getEmail())
                .salary(new BigDecimal(request.getSalary()))
                .build();
    }
}
