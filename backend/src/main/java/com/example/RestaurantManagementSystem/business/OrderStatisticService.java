package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.DailyOrdersStatisticsDTO;
import com.example.RestaurantManagementSystem.api.dto.OrdersStatisticDTO;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.DailyOrdersStatistics;
import com.example.RestaurantManagementSystem.domain.Order;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class OrderStatisticService {
    private final OrderDAO orderDAO;
    private final RestaurantService restaurantService;


    @Transactional
    public OrdersStatisticDTO getOrdersStatistics(String restaurantName, String period) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);
        List<Order> orders = orderDAO.findAllByPeriod(restaurant, startDate, endDate);
        return getOrdersStatistics(orders, startDate, endDate);
    }

    private List<DailyOrdersStatisticsDTO> getDailyOrderStatistics(DailyOrdersStatistics dailyOrdersStatistics) {
        return dailyOrdersStatistics.getDateDailyOrderStatisticsMap().entrySet().stream()
                .map(t -> DailyOrdersStatisticsDTO.builder()
                        .date(t.getKey())
                        .totalOrders(t.getValue().getTotalOrders())
                        .totalCustomers(t.getValue().getTotalOrders())
                        .build())
                .sorted(Comparator.comparing(DailyOrdersStatisticsDTO::getDate))
                .toList();
    }

    public OrdersStatisticDTO getOrdersStatistics(List<Order> orders, OffsetDateTime startDate, OffsetDateTime endDate) {
        DailyOrdersStatistics dailyOrdersStatistics = new DailyOrdersStatistics(startDate, endDate);

        for (Order order : orders) {
            dailyOrdersStatistics.addOrder(order);
        }
        return OrdersStatisticDTO.builder()
                .averageOrderIncome(dailyOrdersStatistics.getAverageOrderIncome())
                .totalCustomers(dailyOrdersStatistics.getTotalCustomers())
                .totalIncome(dailyOrdersStatistics.getTotalIncome())
                .totalOrders(dailyOrdersStatistics.getTotalOrders())
                .averageDailyIncome(dailyOrdersStatistics.getAverageDailyIncome())
                .averageCustomersPerOrder(dailyOrdersStatistics.getAverageCustomersPerOrder())
                .averageOrderDuration(String.valueOf(dailyOrdersStatistics.getAverageOrderDuration().toMinutes()))
                .averageCustomersPerDay(dailyOrdersStatistics.getAverageCustomersPerDay())
                .averageMealPerOrder(dailyOrdersStatistics.getAverageMealsPerOrder())
                .averageCustomersPerDay(dailyOrdersStatistics.getAverageCustomersPerDay())
                .dailyStatistics(getDailyOrderStatistics(dailyOrdersStatistics))
                .averageOrdersPerDay(dailyOrdersStatistics.getAverageOrdersPerDay())
                .build();
    }

    public OffsetDateTime getStartPeriod(String period, OffsetDateTime endDate) {
        switch (period.toLowerCase()) {
            case "today":
                return endDate.truncatedTo(ChronoUnit.DAYS);
            case "3days":
                return endDate.minusDays(2).truncatedTo(ChronoUnit.DAYS);
            case "7days":
                return endDate.minusDays(6).truncatedTo(ChronoUnit.DAYS);
            case "1month":
                return endDate.minusMonths(1).truncatedTo(ChronoUnit.DAYS);
            case "3months":
                return endDate.minusMonths(3).truncatedTo(ChronoUnit.DAYS);
            case "1year":
                return endDate.minusYears(1).truncatedTo(ChronoUnit.DAYS);
            case "all":
            default:
                return OffsetDateTime.of(2000, 1, 1, 0, 0, 0, 0, ZoneOffset.UTC);
        }
    }
}