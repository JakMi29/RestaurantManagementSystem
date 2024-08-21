package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.OrderJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.OrderEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.TableEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class OrderRepository implements OrderDAO {
    private final OrderJpaRepository repository;
    private final OrderEntityMapper mapper;
    private final TableEntityMapper tableMapper;
    private final RestaurantEntityMapper restaurantMapper;

    @Override
    public Order createOrder(Order order) {
        return mapper.map(repository.save(mapper.map(order)));
    }

    @Override
    public Order updateOrder(Order order) {
        return mapper.map(repository.save(mapper.map(order)));
    }

    @Override
    public Order findByNumber(String orderNumber) {
        return mapper.map(repository.findByNumber(orderNumber));
    }

    @Override
    public Order findByTableAndNotByStatus(Table table, OrderStatus status) {
        TableEntity tableEntity = tableMapper.map(table);
        Optional<OrderEntity> orderEntityOpt = repository.findByTableAndStatusNot(tableEntity, status);
        return orderEntityOpt.map(mapper::map).orElse(null);
    }

    @Override
    public Page<Order> findAllByPeriod(Restaurant restaurant, OffsetDateTime startDate, OffsetDateTime endDate, Pageable pageable) {
        RestaurantEntity restaurantEntity = restaurantMapper.map(restaurant);
        return repository.findByRestaurantAndCompletedDateTimeBetween(restaurantEntity, startDate, endDate, pageable).map(mapper::map);
    }
}
