package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Waiter;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class WaiterService {

    private WaiterDAO waiterDAO;

    public Waiter findByEmail(String email){
        return waiterDAO.findByEmail(email);
    }
}
