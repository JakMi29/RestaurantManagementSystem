package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.MealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class MealRepository implements MealDAO {
    private final MealJpaRepository repository;
    private final MealEntityMapper meaLMapper;
    private final RestaurantEntityMapper restaurantMapper;
    @Override
    public Meal createMeal(Meal meal) {
        MealEntity entity= meaLMapper.map(meal);
        return meaLMapper.map(repository.save(entity));
    }

    @Override
    public List<Meal> findAllByRestaurant(Restaurant restaurant) {
        RestaurantEntity entity= restaurantMapper.map(restaurant);
        return repository.findAllByRestaurant(entity)
                .stream()
                .map(meaLMapper::map)
                .toList();
    }

    @Override
    public List<Meal> findAllByRestaurantAndCategory(Restaurant restaurant, Category category) {
        RestaurantEntity restaurantEntity= restaurantMapper.map(restaurant);
        return repository
                .findAllByRestaurantAndCategory(restaurantEntity,category)
                .stream()
                .map(meaLMapper::map)
                .toList();
    }

    @Override
    public Meal findByNameAndRestaurant(String name, Restaurant restaurant) {
        RestaurantEntity restaurantEntity= restaurantMapper.map(restaurant);
        return meaLMapper.map(
                repository.findByNameAndRestaurant(name,restaurantEntity)
        );
    }
}
