package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.RestaurantEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.MealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.RestaurantEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        MealEntity entity = meaLMapper.map(meal);
        return meaLMapper.map(repository.save(entity));
    }

    @Override
    public Meal updateMeal(Meal meal) {
        MealEntity entity = meaLMapper.map(meal);
        return meaLMapper.map(repository.save(entity));
    }

    @Override
    public List<Meal> findAllByRestaurant(Restaurant restaurant) {
        RestaurantEntity entity = restaurantMapper.map(restaurant);
        return repository.findAllByRestaurant(entity)
                .stream()
                .map(meaLMapper::map)
                .toList();
    }

    @Override
    public Page<Meal> findAllByRestaurantAndCategoryAndStatusNot(
            Restaurant restaurant,
            Category category,
            MealStatus mealStatus,
            Pageable pageable
    ) {
        RestaurantEntity restaurantEntity = restaurantMapper.map(restaurant);
        return repository
                .findAllByRestaurantAndCategoryAndStatusNot(restaurantEntity, category, mealStatus, pageable)
                .map(meaLMapper::map);
    }

    @Override
    public Page<Meal> findAllByRestaurantAndCategoryAndStatusNotAndSearchTerms
            (Restaurant restaurant,
             Category category,
             MealStatus mealStatus,
             Pageable pageable,
             String searchTerms
            ) {
        RestaurantEntity restaurantEntity = restaurantMapper.map(restaurant);
        return repository
                .findAllByRestaurantAndCategoryAndStatusNotAndNameContaining
                        (restaurantEntity, category, mealStatus, pageable, searchTerms)
                .map(meaLMapper::map);
    }

    @Override
    public Meal findByNameAndRestaurant(String name, Restaurant restaurant) {
        RestaurantEntity restaurantEntity = restaurantMapper.map(restaurant);
        return meaLMapper.map(
                repository.findByNameAndRestaurant(name, restaurantEntity)
        );
    }

}
