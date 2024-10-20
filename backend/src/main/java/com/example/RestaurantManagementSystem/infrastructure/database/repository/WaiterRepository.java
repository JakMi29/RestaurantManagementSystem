package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.WaiterJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.WaiterEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class WaiterRepository implements WaiterDAO {
    private final WaiterJpaRepository repository;
    private final WaiterEntityMapper mapper;
    private final RestaurantEntityMapper restaurantMapper;

    @Override
    public Waiter createWaiter(Waiter waiter) {
        return mapper.map(repository.save(mapper.mapWithUserAndOrders(waiter)));
    }

    @Override
    public Optional<Waiter> findByEmail(String email) {
        return repository.findByEmail(email).map(mapper::mapWithUserAndOrders);
    }

    @Override
    public Optional<Waiter> findByEmailWithUser(String email) {
        return repository.findByEmail(email).map(mapper::mapWithUserAndOrders);

    }

    @Override
    public Waiter updateWaiter(Waiter waiter) {
        return mapper.map(repository.save(mapper.mapWithUserAndOrders(waiter)));
    }

    @Override
    public Page<Waiter> findAllByRestaurant(Restaurant restaurant, Pageable page) {
        RestaurantEntity restaurantEntity= restaurantMapper.map(restaurant);
        return repository.findAllByRestaurant(restaurantEntity,page).map(mapper::mapWithUserAndOrders);
    }

    @Override
    public Page<Waiter> findAllByRestaurantAndSearchTerms(Restaurant restaurant, Pageable page, String searchTerm) {
        RestaurantEntity restaurantEntity= restaurantMapper.map(restaurant);
        return repository.findAllByRestaurantAndSearchTerms(restaurantEntity,searchTerm,page).map(mapper::map);
    }
}
