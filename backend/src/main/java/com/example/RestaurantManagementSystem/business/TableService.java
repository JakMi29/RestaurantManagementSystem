package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.TableDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class TableService {
    private final TableDAO tableDAO;
    private final TableDTOMapper mapper;
    private final RestaurantService restaurantService;
    private final OrderService orderService;

    @Transactional
    public List<Table> findAllTablesByRestaurant(String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return tableDAO.findAllByRestaurant(restaurant).stream()
                .sorted(Comparator.comparing(Table::getName))
                .toList();
    }

    @Transactional
    public Response createTable(String restaurantName, String tableName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);

        List<Table> tables = tableDAO.findAllByRestaurant(restaurant);
        Optional<Table> existingTable = tables.stream()
                .filter(c -> c.getName().equals(tableName))
                .findFirst();

        Table table = Table.builder()
                .name(tableName)
                .restaurant(restaurant)
                .status(TableStatus.READY).build();

        if (existingTable.isEmpty()) {
            tableDAO.createTable(table);
        } else {
            throw new ObjectAlreadyExist("Table with this name already exist!");
        }
        log.info("Successful add table: %s for restaurant: %s".formatted(tableName, restaurantName));
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Table %s added successfully.".formatted(tableName)))
                .build();
    }

    public Response changeStatus(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table = tableDAO.findByNameAndRestaurant(tableName, restaurant);

        tableDAO.updateTable(table.withStatus(
                switch (table.getStatus()) {
                    case READY -> TableStatus.BUSY;
                    case BUSY -> TableStatus.DIRTY;
                    case DIRTY -> TableStatus.READY;
                }));

        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change table status")
                .build();
    }

    public List<TableDTO> findTablesByRestaurant(String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);

        return tableDAO.findAllTablesWithActiveOrders(restaurant).stream()
                .map(t -> {
                    Order order = orderService.getOrderByTableAndNotStatus(t, OrderStatus.PAID);
                    List<Order> orders = (order != null) ? List.of(order) : List.of();
                    return mapper.map(t.withOrders(orders));
                })
                .sorted(Comparator.comparing(TableDTO::getName))
                .collect(Collectors.toList());
    }
}
