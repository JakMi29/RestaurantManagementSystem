package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.domain.Waiter;
import org.springframework.stereotype.Component;

@Component
public class WaiterDTOMapper {

    public WaiterDTO map(Waiter waiter) {
        return WaiterDTO.builder()
                .email(waiter.getEmail())
                .build();
    }

    public WaiterDTO mapWithUserData(Waiter waiter) {
        return WaiterDTO.builder()
                .email(waiter.getEmail())
                .name(waiter.getUser().getName())
                .surname(waiter.getUser().getSurname())
                .employmentDate(waiter.getEmploymentDate().toString())
                .salary(waiter.getSalary().toString())
                .build();
    }

}
