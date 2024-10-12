package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.api.dto.WaitersDTO;
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
public class WaiterPaginationService {
    private final WaiterService waiterService;

    public Page<WaiterDTO> findAll(
            String restaurantName,
            int pageNumber,
            int pageSize,
            String searchTerm
    ) {
        Sort sort = Sort.by(
                Sort.Order.asc("salary")
        );
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return waiterService.findAll(
                restaurantName,
                pageable,
                searchTerm
        );
    }
}
