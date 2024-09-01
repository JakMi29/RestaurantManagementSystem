package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.*;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class WaitersStatisticService {
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

    @Transactional
    public MealsStatisticDTO getMealsStatistics(String restaurantName, String period) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);
        List<Order> orders = orderDAO.findAllByPeriod(restaurant, startDate, endDate);
        return getMealsStatistics(orders, startDate, endDate);
    }

    public List<TableOrderMealDTO> getMeals(String restaurantName, String period) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);
        List<Order> orders = orderDAO.findAllByPeriod(restaurant, startDate, endDate);
        return prepareTableMeals(orders);
    }

    private List<TableOrderMealDTO> prepareTableMeals(List<Order> orders) {
        Map<String, TableOrderMeal> orderMeals = getDailyMealsStatistics(orders);

        return orderMeals.entrySet().stream()
                .map(entry -> TableOrderMealDTO.builder()
                        .mealName(entry.getKey())
                        .quantity(entry.getValue().getQuantity())
                        .mealPrice(entry.getValue().getMealPrice().toString())
                        .time(String.valueOf(entry.getValue().getTime().dividedBy(entry.getValue().getQuantity()).toMinutes()))
                        .totalPrice(entry.getValue().getTotalPrice().toString())
                        .build())
                .collect(Collectors.toList());
    }

    private Map<String, TableOrderMeal> getDailyMealsStatistics(List<Order> orders) {
        Map<String, TableOrderMeal> orderMeals = new HashMap<>();
        for (Order order : orders) {
            for (OrderMeal meal : order.getOrderMeals()) {
                TableOrderMeal orderMeal = orderMeals.getOrDefault(meal.getMeal().getName(), new TableOrderMeal(meal));
                orderMeal.addMeal(meal);
                orderMeals.put(meal.getMeal().getName(), orderMeal);
            }
        }
        return orderMeals;
    }

    private MealsStatisticDTO getMealsStatistics(List<Order> orders, OffsetDateTime startDate, OffsetDateTime endDate) {
        Map<LocalDate, DailyMealsStatistics> dailyStatsMap = new HashMap<>();
        int totalQuantity = 0;
        Duration totalTime = Duration.ZERO;

        LocalDate currentDate = startDate.toLocalDate();
        while (!currentDate.isAfter(endDate.toLocalDate())) {
            dailyStatsMap.put(currentDate, new DailyMealsStatistics());
            currentDate = currentDate.plusDays(1);
        }

        for (Order order : orders) {
            for (OrderMeal meal : order.getOrderMeals()) {
                totalQuantity += meal.getQuantity();
                totalTime = totalTime
                        .plus(Duration.between(
                                meal.getReceivedDateTime(), meal.getCompletedDateTime()));
                LocalDate orderDate = order.getCompletedDateTime().toLocalDate();
                DailyMealsStatistics dailyStats = dailyStatsMap.get(orderDate);
                dailyStats.addMeal(meal);
            }
        }

        int days = dailyStatsMap.size();
        int averageDailyMealsQuantity = days > 0 ? totalQuantity / days : 0;
        int averageMealsPerOrder = orders.size() > 0 ? totalQuantity / orders.size() : 0;
        Duration averageTime = (totalTime != null && totalQuantity > 0) ? totalTime.dividedBy(totalQuantity) : Duration.ZERO;

        List<DailyMealsStatisticsDTO> dailyStatistics = dailyStatsMap.entrySet().stream()
                .map(entry -> DailyMealsStatisticsDTO.builder()
                        .date(entry.getKey())
                        .quantity(entry.getValue().getQuantity())
                        .duration(String.valueOf(entry.getValue().getTime().dividedBy(entry.getValue().getQuantity()).toMinutes()))
                        .build())
                .collect(Collectors.toList());

        List<Top5MealsDTO> mostSalesMeals = this.getDailyMealsStatistics(orders).entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.comparing(TableOrderMeal::getQuantity).reversed()))
                .limit(5)
                .map(entry ->
                        Top5MealsDTO.builder()
                                .name(entry.getKey())
                                .price(entry.getValue().getMealPrice().toString())
                                .quantity(entry.getValue().getQuantity())
                                .build())
                .collect(Collectors.toList());

        List<Top5MealsDTO> highestIncomeMeals = this.getDailyMealsStatistics(orders).entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.comparing(TableOrderMeal::getTotalPrice).reversed()))
                .limit(5)
                .map(entry ->
                        Top5MealsDTO.builder()
                                .name(entry.getKey())
                                .price(entry.getValue().getTotalPrice().toString())
                                .quantity(entry.getValue().getQuantity())
                                .build())
                .collect(Collectors.toList());

        return MealsStatisticDTO.builder()
                .totalSoldMeals(totalQuantity)
                .averageDailySoldMeals(averageDailyMealsQuantity)
                .mostSalesMeal(mostSalesMeals)
                .highestIncomeMeal(highestIncomeMeals)
                .averageMealsPerOrder(averageMealsPerOrder)
                .averagePrepareMealTime(String.valueOf(averageTime.toMinutes()))
                .dailyStatistics(dailyStatistics)
                .build();
    }

    private OrdersStatisticDTO getOrdersStatistics(List<Order> orders, OffsetDateTime startDate, OffsetDateTime endDate) {
        BigDecimal totalIncome = BigDecimal.ZERO;
        int totalCustomers = 0;
        Map<LocalDate, DailyOrdersStatistics> dailyStatsMap = new HashMap<>();

        LocalDate currentDate = startDate.toLocalDate();
        while (!currentDate.isAfter(endDate.toLocalDate())) {
            dailyStatsMap.put(currentDate, new DailyOrdersStatistics());
            currentDate = currentDate.plusDays(1);
        }

        for (Order order : orders) {
            totalIncome = totalIncome.add(order.getPrice());
            totalCustomers += order.getCustomerQuantity();

            LocalDate orderDate = order.getCompletedDateTime().toLocalDate();
            DailyOrdersStatistics dailyStats = dailyStatsMap.get(orderDate);
            dailyStats.addOrder(order);
        }

        int days = dailyStatsMap.size();
        BigDecimal averageIncome = days > 0 ? totalIncome.divide(BigDecimal.valueOf(days), RoundingMode.HALF_UP) : BigDecimal.ZERO;
        int averageCustomers = days > 0 ? totalCustomers / days : 0;

        List<DailyOrdersStatisticsDTO> dailyStatistics = dailyStatsMap.entrySet().stream()
                .map(entry -> DailyOrdersStatisticsDTO.builder()
                        .date(entry.getKey())
                        .totalCustomers(entry.getValue().getTotalGuests())
                        .totalOrders(entry.getValue().getTotalOrders())
                        .build())
                .collect(Collectors.toList());
        return OrdersStatisticDTO.builder()
                .averageIncome(averageIncome)
                .totalIncome(totalIncome)
                .totalCustomers(totalCustomers)
                .averageCustomers(averageCustomers)
                .dailyStatistics(dailyStatistics)
                .build();
    }

    private OffsetDateTime getStartPeriod(String period, OffsetDateTime endDate) {
        switch (period.toLowerCase()) {
            case "today":
                return endDate.truncatedTo(ChronoUnit.DAYS);
            case "3days":
                return endDate.minusDays(3).truncatedTo(ChronoUnit.DAYS);
            case "7days":
                return endDate.minusDays(7).truncatedTo(ChronoUnit.DAYS);
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