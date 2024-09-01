package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.api.dto.mapper.OrderDTOMapper;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.OrderEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.TableEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

public interface OrderDAO {
    Order createOrder(Order order);

    Order updateOrder(Order order);

    Order findByNumber(String orderNumber);

    Order findByTableAndNotByStatus(Table table, OrderStatus status);

    Page<Order> findAllByPeriod(Restaurant restaurant, OffsetDateTime startDate, OffsetDateTime endDate, Pageable pageable);
    List<Order> findAllByPeriod(Restaurant restaurant, OffsetDateTime startDate, OffsetDateTime endDate);
}
