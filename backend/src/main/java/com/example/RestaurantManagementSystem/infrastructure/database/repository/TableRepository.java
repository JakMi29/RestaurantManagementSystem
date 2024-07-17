package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.*;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.MealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.TableJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.TableEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class TableRepository implements TableDAO {
    private final TableJpaRepository repository;
    private final TableEntityMapper tableEntityMapper;
    private final RestaurantEntityMapper restaurantEntityMapper;

    @Override
    public Table createTable(Table table) {
        return tableEntityMapper.map(repository.save(tableEntityMapper.map(table)));
    }

    @Override
    public List<Table> findAllByRestaurant(Restaurant restaurant) {
        RestaurantEntity restaurantEntity=restaurantEntityMapper.map(restaurant);
        return repository.findAllByRestaurant(restaurantEntity).stream().map(tableEntityMapper::map).toList();
    }
}
