package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableOrderMealDTO;
import com.example.RestaurantManagementSystem.api.dto.WaitersDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class StatisticsPaginationService {
    private final WaiterStatisticService waiterStatisticService;
    private final MealsStatisticService mealsStatisticService;


    public Page<TableOrderMealDTO> getMealsByPeriod(
            String restaurantName,
            String period,
            int pageSize,
            int pageNumber
    ) {
        List<TableOrderMealDTO> allMeals = mealsStatisticService.getMealsByPeriod(restaurantName, period);

        int totalItems = allMeals.size();
        int fromIndex = pageNumber * pageSize;
        if (fromIndex >= totalItems) {
            return new PageImpl<>(new ArrayList<>(), PageRequest.of(pageNumber, pageSize), totalItems);
        }
        int toIndex = Math.min(fromIndex + pageSize, totalItems);

        List<TableOrderMealDTO> paginatedMeals = allMeals.subList(fromIndex, toIndex);

        return new PageImpl<>(paginatedMeals, PageRequest.of(pageNumber, pageSize), totalItems);
    }

    public Page<WaitersDTO> findAll(
            String restaurantName,
            int pageNumber,
            int pageSize,
            String searchTerm,
            String period
    ) {
        Sort sort = Sort.by(
                Sort.Order.asc("salary")
        );
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return waiterStatisticService.getWaitersStatistics(
                restaurantName,
                pageable,
                searchTerm,
                period
        );
    }
}
