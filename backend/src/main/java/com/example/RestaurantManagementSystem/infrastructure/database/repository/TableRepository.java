package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.TableDAO;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Table;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.TableJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.TableEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class TableRepository implements TableDAO {
    private final TableJpaRepository repository;
    private final TableEntityMapper mapper;
    private final RestaurantEntityMapper restaurantEntityMapper;

    @Override
    public Table createTable(Table table) {
        return mapper.map(repository.save(mapper.map(table)));
    }

    @Override
    public Table updateTable(Table table) {
        return mapper.map(repository.save(mapper.map(table)));
    }

    @Override
    public List<Table> findAllByRestaurant(Restaurant restaurant) {
        RestaurantEntity restaurantEntity = restaurantEntityMapper.map(restaurant);
        return repository.findAllByRestaurant(restaurantEntity).stream().map(mapper::map).toList();
    }

    @Override
    public Optional<Table> findByNameAndRestaurant(String name, Restaurant restaurant) {
        RestaurantEntity restaurantEntity = restaurantEntityMapper.map(restaurant);
        return repository.findByNameAndRestaurant(name, restaurantEntity).map(mapper::map);
    }

    @Override
    public Page<Table> findAllTablesByRestaurantAndSearchTerm(Restaurant restaurant, Pageable page, String searchTerm) {
        RestaurantEntity restaurantEntity = restaurantEntityMapper.map(restaurant);
        return repository.findAllTablesByRestaurantAndSearchTerm(restaurantEntity, page, searchTerm).map(mapper::mapWithOrder);
    }

    @Override
    public Page<Table> findAllTablesByRestaurant(Restaurant restaurant, Pageable page) {
        RestaurantEntity restaurantEntity = restaurantEntityMapper.map(restaurant);
        return repository.findAllTablesByRestaurant(restaurantEntity, page).map(mapper::mapWithOrder);
    }
}
