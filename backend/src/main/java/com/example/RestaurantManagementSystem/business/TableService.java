package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.TableDTOMapper;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.TableStatus;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class TableService {
    private final TableDAO tableDAO;
    private final TableDTOMapper mapper;
    private final RestaurantService restaurantService;


    @Transactional
    public List<Table> findAllTablesByRestaurant(String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return tableDAO.findAllByRestaurant(restaurant);
    }

    @Transactional
    public void createTable(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Optional<Table> existingTable = tableDAO.findByNameAndRestaurant(tableName, restaurant);

        Table table = Table.builder()
                .name(tableName)
                .restaurant(restaurant)
                .active(true)
                .status(TableStatus.READY).build();

        if (existingTable.isEmpty()) {
            tableDAO.createTable(table);
        } else {
            throw new ObjectAlreadyExist("Table with this name already exist!");
        }
        log.info("Successful create table: %s for restaurant: %s".formatted(tableName, restaurantName));
    }

    public TableDTO changeStatus(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table = tableDAO.findByNameAndRestaurant(tableName, restaurant)
                .orElseThrow(() -> new RuntimeException("Something gone wrong"));

        return mapper.map(tableDAO.updateTable(table.withStatus(
                switch (table.getStatus()) {
                    case READY -> TableStatus.BUSY;
                    case BUSY -> TableStatus.DIRTY;
                    case DIRTY -> TableStatus.READY;
                })));
    }

    public Optional<Table> findByNameAndRestaurant(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return tableDAO.findByNameAndRestaurant(tableName, restaurant);
    }

    public void updateTable(String tableName, String oldTableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);

        Optional<Table> existingTable = tableDAO.findByNameAndRestaurant(tableName, restaurant);

        existingTable.ifPresent(table -> {
            throw new ObjectAlreadyExist("Table with this name already exists");
        });

        Table table = tableDAO.findByNameAndRestaurant(oldTableName, restaurant)
                .orElseThrow(() -> new ObjectAlreadyExist("Table with this name does not exist"));

        tableDAO.updateTable(table.withName(tableName));

        log.info("Successful update table: %s for restaurant: %s".formatted(tableName, restaurantName));
    }
}
