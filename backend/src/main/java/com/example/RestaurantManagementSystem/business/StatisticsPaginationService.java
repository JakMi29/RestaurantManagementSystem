package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.WaitersDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class StatisticsPaginationService {
    private final WaiterStatisticService waiterStatisticService;

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
