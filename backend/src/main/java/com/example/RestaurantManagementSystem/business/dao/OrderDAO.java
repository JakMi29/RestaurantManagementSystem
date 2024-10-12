package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.api.dto.mapper.OrderDTOMapper;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderDAO {
    Order createOrder(Order order);

    Order updateOrder(Order order);

    Order findByNumber(String orderNumber);

    Optional<Order> findByTableAndNotByStatus(Table table, OrderStatus status);

    Page<Order> findAllByPeriod(Restaurant restaurant, OffsetDateTime startDate, OffsetDateTime endDate, Pageable pageable);
    List<Order> findAllByPeriod(Restaurant restaurant, OffsetDateTime startDate, OffsetDateTime endDate);
    List<Order> findAllByPeriodAndWaiter(Waiter waiter, OffsetDateTime startDate, OffsetDateTime endDate);
}
