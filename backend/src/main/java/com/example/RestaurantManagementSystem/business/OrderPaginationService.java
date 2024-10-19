package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.OrderDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class OrderPaginationService {

    private final OrderService orderService;


    public Page<OrderDTO> findAllByPeriod(
            String restaurantName,
            String period,
            int pageSize,
            int pageNumber

    ) {
//        Sort sort = Sort.by(
//                Sort.Order.desc("mealOfTheDay"),
//                Sort.Order.asc("name")
//        );
        Sort sort = Sort.unsorted();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return orderService.findAllByPeriod(
                restaurantName,
                period,
                pageable
        );
    }
}
