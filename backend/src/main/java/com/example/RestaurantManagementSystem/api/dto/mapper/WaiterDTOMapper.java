package com.example.RestaurantManagementSystem.api.dto.mapper;

import com.example.RestaurantManagementSystem.api.dto.WaiterDTO;
import com.example.RestaurantManagementSystem.domain.Waiter;
import org.springframework.stereotype.Component;

@Component
public class WaiterDTOMapper {


    public WaiterDTO map(Waiter waiter) {
        if (waiter == null)
            return null;
        return WaiterDTO.builder()
                .email(waiter.getEmail())
                .name(waiter.getUser().getName())
                .surname(waiter.getUser().getSurname())
                .employmentDate(waiter.getEmploymentDate().toLocalDate().toString())
                .salary(waiter.getSalary().toString())
                .phone(waiter.getUser().getPhone())
                .build();
    }

}
