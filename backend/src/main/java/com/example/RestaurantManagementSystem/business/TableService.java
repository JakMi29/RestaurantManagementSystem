package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.rest.response.Response;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.TableStatus;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class TableService {
    private final TableDAO tableDAO;
    private final RestaurantService restaurantService;

    @Transactional
    public List<Table> findAllTablesByRestaurant(String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return tableDAO.findAllByRestaurant(restaurant);
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

    public Response changeStatus( String restaurantName,String tableName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table=tableDAO.findByNameAndRestaurant(tableName,restaurant);
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message("Successfully change table status")
                .build();
    }
}