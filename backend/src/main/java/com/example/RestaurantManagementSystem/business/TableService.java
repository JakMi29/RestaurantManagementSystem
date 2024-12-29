package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.TableDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.CreateTableRequest;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.domain.TableStatus;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExistException;
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
    public TableDTO createTable(CreateTableRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        tableDAO.findByNameAndRestaurant(request.getName(), restaurant).ifPresent(meal -> {
            throw new ObjectAlreadyExistException("Table with this name already exists!");
        });
        Table table = tableDAO.createTable(Table.builder()
                .name(request.getName())
                .restaurant(restaurant)
                .active(true)
                .status(TableStatus.READY).build());
        log.info("Successful create table: %s ".formatted(table.getName()));
        return mapper.map(table);
    }

    @Transactional
    public TableDTO changeStatus(String tableName, String restaurantName, boolean complete) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Table table = tableDAO.findByNameAndRestaurant(tableName, restaurant)
                .orElseThrow(() -> new NotFoundException("Something gone wrong"));
        TableStatus tableStatus = complete
                ? TableStatus.DIRTY
                : switch (table.getStatus()) {
            case READY -> TableStatus.BUSY;
            case BUSY -> TableStatus.DIRTY;
            case DIRTY -> TableStatus.READY;
        };
        Table updatedTable = tableDAO.updateTable(table.withStatus(tableStatus));
        log.info("Successful update table: %s status".formatted(tableName));
        return mapper.map(updatedTable);
    }

    public Optional<Table> findByNameAndRestaurant(String tableName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return tableDAO.findByNameAndRestaurant(tableName, restaurant);
    }

    @Transactional
    public TableDTO updateTable(CreateTableRequest request) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Optional<Table> existingTable = tableDAO.findByNameAndRestaurant(request.getName(), restaurant);
        existingTable.ifPresent(table -> {
            throw new ObjectAlreadyExistException("Table with this name already exists");
        });
        Table table = tableDAO.findByNameAndRestaurant(request.getOldName(), restaurant)
                .orElseThrow(() -> new NotFoundException("Table with this name does not exist"));

        Table updatedTable = tableDAO.updateTable(table.withName(request.getName()));
        log.info("Successful update table: %s".formatted(request.getName()));
        return mapper.map(updatedTable);
    }
}
