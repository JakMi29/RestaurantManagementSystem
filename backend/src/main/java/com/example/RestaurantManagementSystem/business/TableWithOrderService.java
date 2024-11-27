package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.TableDTOMapper;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.OrderStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.exception.BadRequestException;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class TableWithOrderService {

    private final TableDAO tableDAO;
    private final OrderDAO orderDAO;
    private final TableDTOMapper mapper;
    private final RestaurantService restaurantService;

    public TableDTO deleteTable(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table = findTableByNameAndRestaurant(tableName, restaurant);

        validateNoActiveOrders(table);

        Table deletedTable = tableDAO.updateTable(table.withActive(false));
        log.info("Successfully deleted table: {}", deletedTable.getName());

        return mapper.map(deletedTable);
    }

    public Page<TableDTO> findTablesByRestaurant(String restaurantName, Pageable page, String searchTerm) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);

        Page<Table> tables = (searchTerm != null)
                ? tableDAO.findAllTablesByRestaurantAndSearchTerm(restaurant, page, searchTerm)
                : tableDAO.findAllTablesByRestaurant(restaurant, page);

        return tables.map(this::mapTableWithOptionalOrder);
    }

    private Table findTableByNameAndRestaurant(String tableName, Restaurant restaurant) {
        return tableDAO.findByNameAndRestaurant(tableName, restaurant)
                .orElseThrow(() -> new NotFoundException("Table with this name does not exist"));
    }

    private void validateNoActiveOrders(Table table) {
        orderDAO.findByTableAndNotByStatus(table, OrderStatus.PAID)
                .ifPresent(order -> {
                    throw new BadRequestException("Cannot delete table with active order");
                });
    }

    private TableDTO mapTableWithOptionalOrder(Table table) {
        Optional<Order> order = orderDAO.findByTableAndNotByStatus(table, OrderStatus.PAID);
        return mapper.map(table.withOrder(order.orElse(null)));
    }
}
