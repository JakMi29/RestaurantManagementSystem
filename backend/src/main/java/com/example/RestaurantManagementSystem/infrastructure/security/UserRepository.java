package com.example.RestaurantManagementSystem.infrastructure.security;

import com.example.RestaurantManagementSystem.business.dao.UserDAO;
import com.example.RestaurantManagementSystem.domain.User;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.UserEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class UserRepository implements UserDAO {
    private final UserJpaRepository repository;
    private final UserEntityMapper mapper;


    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email).map(mapper::map);
    }

    @Override
    public User updateUser(User user) {
        return mapper.map(repository.save(mapper.map(user)));
    }
}
