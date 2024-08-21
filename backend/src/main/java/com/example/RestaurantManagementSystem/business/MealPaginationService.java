package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.domain.Meal;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class MealPaginationService {

    private final MealService mealService;


    public Page<Meal> findAllByCategory(
            String restaurantName,
            String category,
            int pageNumber,
            int pageSize,
            String searchTerm,
            List<String> excludesNames

    ) {
        Sort sort = Sort.by(
                Sort.Order.desc("mealOfTheDay"),
                Sort.Order.asc("name")
        );
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return mealService.findAllByCategory(
                restaurantName,
                category,
                pageable,
                searchTerm,
                excludesNames
        );
    }

}
