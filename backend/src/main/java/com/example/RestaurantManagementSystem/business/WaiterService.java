package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.WaiterDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateWaiterRequest;
import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.User;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExistException;
import com.example.RestaurantManagementSystem.infrastructure.security.Role;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Log
@Component
@AllArgsConstructor
public class WaiterService {

    private final RestaurantService restaurantService;
    private final WaiterDTOMapper mapper;
    private final WaiterDAO waiterDAO;

    @Transactional
    public Waiter findByEmail(String email) {
        return waiterDAO.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));
    }

    @Transactional
    public Page<WaiterDTO> findAll(String restaurantName, Pageable page, String searchTerm) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Page<Waiter> waiters = (searchTerm != null)
                ? waiterDAO.findAllByRestaurantAndSearchTerms(restaurant, page, searchTerm)
                : waiterDAO.findAllByRestaurant(restaurant, page);

        return waiters.map(mapper::map);
    }

    @Transactional
    public WaiterDTO createWaiter(CreateWaiterRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        checkIfWaiterExists(request.getEmail());

        Waiter waiter = buildWaiter(request, restaurant);
        Waiter updatedWaiter = waiterDAO.createWaiter(waiter);
        log.info("Successful create waiter: %s".formatted(
                updatedWaiter.getUser().getName()).concat(updatedWaiter.getUser().getSurname())
        );
        return mapper.map(updatedWaiter);
    }

    @Transactional
    public WaiterDTO updateWaiter(CreateWaiterRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Waiter waiter = waiterDAO.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));

        if (isEmailChangedAndExists(request.getOldEmail(), waiter.getEmail())) {
            throw new ObjectAlreadyExistException("Waiter with this email already exists!");
        }

        waiter = createWaiterWithUser(waiter, request, restaurant);
        Waiter updatedWaiter = waiterDAO.updateWaiter(waiter);

        log.info("Successful update waiter: %s".formatted(
                updatedWaiter.getUser().getName()).concat(updatedWaiter.getUser().getSurname())
        );
        return mapper.map(updatedWaiter);
    }

    @Transactional
    public WaiterDTO deleteWaiter(String email) {
        Waiter waiter = waiterDAO.findByEmailWithUser(email)
                .map(w -> w.withUser(w.getUser().withActive(false)))
                .orElseThrow(() -> new NotFoundException("Waiter with this email does not exist"));
        Waiter updatedWaiter = waiterDAO.updateWaiter(waiter);

        log.info("Successful deactivate waiter: %s".formatted(
                updatedWaiter.getUser().getName()).concat(updatedWaiter.getUser().getSurname())
        );
        return mapper.map(updatedWaiter);
    }

    private Waiter createWaiterWithUser(Waiter waiter, CreateWaiterRequest request, Restaurant restaurant) {
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

    private void checkIfWaiterExists(String email) {
        waiterDAO.findByEmailWithUser(email)
                .ifPresent(w -> {
                    throw new ObjectAlreadyExistException("Waiter with this email already exists!");
                });
    }

    private boolean isEmailChangedAndExists(String oldEmail, String currentEmail) {
        return !oldEmail.equals(currentEmail);
    }
}