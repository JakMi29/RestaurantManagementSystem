package com.example.RestaurantManagementSystem.infrastructure.database.repository;

import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.infrastructure.database.entity.MealEntity;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.jpa.MealJpaRepository;
import com.example.RestaurantManagementSystem.infrastructure.database.repository.mapper.MealEntityMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class MealRepository implements MealDAO {
    private final MealJpaRepository repository;
    private final MealEntityMapper mapper;
    @Override
    public Meal createMeal(Meal meal) {
        MealEntity entity=mapper.map(meal);
        return mapper.map(repository.save(entity));
    }
}
