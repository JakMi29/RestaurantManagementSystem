package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class MealPaginationService {

    private final MealService mealService;


    public Page<Meal> findAllByCategory(
            String restaurantName,
            String category,
            int pageNumber,
            int pageSize
    ) {
        Sort sort = Sort.by(
                Sort.Order.desc("mealOfTheDay"),
                Sort.Order.asc("name")
        );
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return mealService.findAllByCategory(
                restaurantName,
                category,
                pageable
        );

    }
}
