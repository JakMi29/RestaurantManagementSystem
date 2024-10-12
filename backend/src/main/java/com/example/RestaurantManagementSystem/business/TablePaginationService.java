package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.TableDTO;
import com.example.RestaurantManagementSystem.domain.Table;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class TablePaginationService {
    private final TableWithOrderService tableService;

    public Page<TableDTO> findAll(
            String restaurantName,
            int pageNumber,
            int pageSize,
            String searchTerm
    ) {
        Sort sort = Sort.by(
                Sort.Order.asc("name")
        );
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return tableService.findTablesByRestaurant(
                restaurantName,
                pageable,
                searchTerm
        );
    }
}
