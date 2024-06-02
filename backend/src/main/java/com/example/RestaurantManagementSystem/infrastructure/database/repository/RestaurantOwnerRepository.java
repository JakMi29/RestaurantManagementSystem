package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.RestaurantOwnerDAO;
import com.example.RestaurantManagementSystem.domain.RestaurantOwner;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantOwnerEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.RestaurantOwnerJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantOwnerMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class RestaurantOwnerRepository implements RestaurantOwnerDAO {

    private final RestaurantOwnerJpaRepository repository;
    private final RestaurantOwnerMapper mapper;
    @Override
    public RestaurantOwner createRestaurantOwner(String email) {
        RestaurantOwnerEntity restaurantOwner= RestaurantOwnerEntity.builder().email(email).build();
        return mapper.map(repository.save(restaurantOwner));
    }
}
