package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.TableDTOMapper;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class TableWithOrderService {
    private final TableDAO tableDAO;

    private final OrderDAO orderDAO;
    private final TableDTOMapper mapper;
    private final RestaurantService restaurantService;


    public void deleteTable(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table = tableDAO.findByNameAndRestaurant(tableName, restaurant)
                .orElseThrow(() -> new RuntimeException("Table with this name does not exist"));
        orderDAO.findByTableAndNotByStatus(table, OrderStatus.PAID)
                .ifPresent(order -> {
                    throw new RuntimeException("Cannot delete table with active order");
                });
        tableDAO.updateTable(table.withActive(false));

        log.info("Successful delete table: %s for restaurant: %s".formatted(tableName, restaurantName));
    }

    public Page<TableDTO> findTablesByRestaurant(String restaurantName, Pageable page, String searchTerm) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        if (searchTerm != null) {
            return tableDAO.findAllTablesByRestaurantAndSearchTerm(restaurant, page, searchTerm)
                    .map(t -> {
                        Optional<Order> order = orderDAO.findByTableAndNotByStatus(t, OrderStatus.PAID);
                        return mapper.map(t.withOrders(order.map(List::of).orElse(Collections.emptyList())));
                    });
        } else {
            return tableDAO.findAllTablesByRestaurant(restaurant, page)
                    .map(t -> {
                        Optional<Order> order = orderDAO.findByTableAndNotByStatus(t, OrderStatus.PAID);
                        return mapper.map(t.withOrders(order.map(List::of).orElse(Collections.emptyList())));
                    });
        }
    }
}
