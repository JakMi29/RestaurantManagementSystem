package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.RestaurantDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.RestaurantJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class RestaurantRepository implements RestaurantDAO {
    private final RestaurantJpaRepository repository;
    private final RestaurantEntityMapper mapper;

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        RestaurantEntity entity=mapper.map(restaurant);
        return mapper.map(entity);
    }

    @Override
    public Restaurant findByName(String name) {
        return mapper.map(repository.findByName(name));
    }
}
