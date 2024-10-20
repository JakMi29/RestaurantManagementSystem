package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.*;
import com.example.RestaurantManagementSystem.api.dto.mapper.WaiterDTOMapper;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.business.dao.WaiterDAO;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.Waiter;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class WaiterStatisticService {
    private final WaiterDTOMapper mapper;
    private final WaiterDAO waiterDAO;
    private final OrderDAO orderDAO;
    private final RestaurantService restaurantService;
    private final OrderStatisticService orderStatisticService;
    private final MealsStatisticService mealsStatisticService;

    public Page<WaitersDTO> buildStatistics(Page<Waiter> waiters) {
        return waiters.map(this::getStatistics);
    }

    private WaitersDTO getStatistics(Waiter waiter) {
        Integer totalCustomers = 0;
        int totalMeals = 0;
        BigDecimal totalIncome = BigDecimal.ZERO;

        List<Order> orders = waiter.getOrders();
        if (orders != null) {
            for (Order order : orders) {
                totalCustomers += order.getCustomerQuantity();
                totalMeals+=order.getOrderMeals().size();
                totalIncome = totalIncome.add(order.getPrice());
            }
        }
        return WaitersDTO.builder()
                .waiter(mapper.mapWithUserData(waiter))
                .totalCustomers(totalCustomers)
                .totalMeals(totalMeals)
                .totalOrders(waiter.getOrders().size())
                .totalIncome(totalIncome.toString())
                .build();
    }

    public Page<WaitersDTO> getWaitersStatistics(
            String restaurantName, Pageable page, String searchTerm, String period
    ) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Page<Waiter> waiters = searchTerm != null ?
                waiterDAO.findAllByRestaurantAndSearchTerms(restaurant, page, searchTerm) :
                waiterDAO.findAllByRestaurant(restaurant, page);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = orderStatisticService.getStartPeriod(period, endDate);
        waiters = waiters.map(w -> w.withOrders(orderDAO.findAllByPeriodAndWaiter(w, startDate, endDate)));
        return waiters.map(this::getStatistics);
    }

    public WaiterDailyStatisticsDTO getWaiterStatistics(String email, String period) {
        Waiter waiter=waiterDAO.findByEmail(email)
                .orElseThrow(()->new NotFoundException("Waiter with this email does not exist"));
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = orderStatisticService.getStartPeriod(period, endDate);
        List<Order> orders=orderDAO.findAllByPeriodAndWaiter(waiter, startDate, endDate);
        OrdersStatisticDTO ordersStatisticDTO= orderStatisticService.getOrdersStatistics(orders,startDate,endDate);
        MealsStatisticDTO mealsStatisticDTO=mealsStatisticService.getMealsStatistics(orders,startDate,endDate);
        return WaiterDailyStatisticsDTO
                .builder()
                .waiter(mapper.mapWithUserData(waiter))
                .orderStatistic(ordersStatisticDTO)
                .mealsStatistic(mealsStatisticDTO)
        .build();
    }
}