package com.example.RestaurantManagementSystem.business.dao;

import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;

import java.util.List;

public interface TableDAO {
    Table createTable(Table table);

    Table updateTable(Table table);

    List<Table> findAllByRestaurant(Restaurant restaurant);

    Table findByNameAndRestaurant(String name, Restaurant restaurant);

    List<Table> findAllTablesWithActiveOrders(Restaurant restaurant);
}

