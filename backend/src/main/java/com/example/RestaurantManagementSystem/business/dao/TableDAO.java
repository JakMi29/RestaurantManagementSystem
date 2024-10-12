package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TableDAO {
    Table createTable(Table table);

    Table updateTable(Table table);

    List<Table> findAllByRestaurant(Restaurant restaurant);

    Optional<Table> findByNameAndRestaurant(String name, Restaurant restaurant);

    Page<Table> findAllTablesByRestaurant(Restaurant restaurant, Pageable page);

    Page<Table> findAllTablesByRestaurantAndSearchTerm(Restaurant restaurant, Pageable page, String searchTerm);
}

