package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.OrderJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class OrderRepository implements OrderDAO {
    private final OrderJpaRepository repository;
    private final OrderEntityMapper mapper;

    @Override
    public void createOrder(Order order) {
        repository.save(mapper.map(order));
    }

    @Override
    public void updateOrder(Order order) {
        repository.save(mapper.map(order));
    }

    @Override
    public Order findByNumber(String orderNumber) {
        return mapper.map(repository.findByNumber(orderNumber));
    }
}
