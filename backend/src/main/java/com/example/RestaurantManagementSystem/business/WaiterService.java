package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.WaiterDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.business.dao.UserDAO;
import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.User;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import com.example.RestaurantManagementSystem.infrastructure.security.Role;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Optional;


@Component
@AllArgsConstructor
public class WaiterService {
    private final RestaurantService restaurantService;
    private final WaiterDTOMapper mapper;
    private WaiterDAO waiterDAO;

    @Transactional
    public Waiter findByEmail(String email) {
        return waiterDAO.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));
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
        Optional<Waiter> existingWaiter = waiterDAO.findByEmailWithUser(request.getEmail());
        if (existingWaiter.isPresent()) {
            throw new ObjectAlreadyExist("Waiter with this name already exist!");
        }
        Waiter waiter = this.buildWaiter(request, restaurant);
        return mapper.map(waiterDAO.createWaiter(waiter));
    }

    @Transactional
    public WaiterDTO updateWaiter(CreateWaiterRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Optional<Waiter> existingWaiter = waiterDAO.findByEmailWithUser(request.getEmail());
        if (existingWaiter.isPresent() && !request.getOldEmail().equals(existingWaiter.get().getEmail())) {
            throw new ObjectAlreadyExist("Waiter with this name already exist!");
        }
        Waiter waiter = waiterDAO.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));
        return mapper.map(waiterDAO.updateWaiter(this.updateWaiter(waiter, request, restaurant)));
    }

    @Transactional
    public WaiterDTO deleteWaiter(String email) {
        Waiter waiter = waiterDAO.findByEmailWithUser(email)
                .map(t -> t.withUser(t.getUser().withActive(false)))
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));
        return mapper.map(waiterDAO.updateWaiter(waiter));
    }

    private Waiter updateWaiter(Waiter waiter, CreateWaiterRequest request, Restaurant restaurant) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return waiter.withRestaurant(restaurant)
                .withEmail(request.getEmail())
                .withSalary(new BigDecimal(request.getSalary()))
                .withUser(waiter.getUser()
                        .withEmail(request.getEmail())
                        .withName(request.getName())
                        .withPhone(request.getPhone())
                        .withSurname(request.getSurname())
                        .withPassword(passwordEncoder.encode(request.getPassword()))
                );
    }

    private Waiter buildWaiter(CreateWaiterRequest request, Restaurant restaurant) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return Waiter.builder()
                .restaurant(restaurant)
                .email(request.getEmail())
                .salary(new BigDecimal(request.getSalary()))
                .employmentDate(OffsetDateTime.now())
                .user(User.builder()
                        .phone(request.getPhone())
                        .role(Role.WAITER)
                        .surname(request.getSurname())
                        .name(request.getName())
                        .active(true)
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build())
                .build();
    }
}
