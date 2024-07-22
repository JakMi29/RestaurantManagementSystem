package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.WaiterJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.WaiterEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class WaiterRepository implements WaiterDAO {
    private final WaiterJpaRepository repository;
    private final WaiterEntityMapper mapper;

    @Override
    public Waiter createWaiter(Waiter entity) {
        return mapper.map(repository.save(mapper.map(entity)));
    }

    @Override
    public Waiter findByEmail(String email) {
        return mapper.map(repository.findByEmail(email));
    }
}
