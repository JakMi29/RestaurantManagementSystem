package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.*;
import com.example.RestaurantManagementSystem.business.dao.OrderDAO;
import com.example.RestaurantManagementSystem.domain.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
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
public class MealsStatisticService {
    private final OrderDAO orderDAO;
    private final RestaurantService restaurantService;

    @Transactional
    public MealsStatisticDTO getMealsStatistics(String restaurantName, String period) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        OffsetDateTime endDate = OffsetDateTime.now();
        OffsetDateTime startDate = getStartPeriod(period, endDate);
        List<Order> orders = orderDAO.findAllByPeriod(restaurant, startDate, endDate);
        return getMealsStatistics(orders, startDate, endDate);
    }

    public List<TableOrderMealDTO> getMealsByPeriod(String restaurantName, String period) {
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

    private List<Top5MealsDTO> getMostSalesMeals(List<Order> orders) {
        return getTop5Meals(orders, Comparator.comparing(TableOrderMeal::getQuantity).reversed());
    }

    private List<Top5MealsDTO> getMostIncomeMeals(List<Order> orders) {
        return getTop5Meals(orders, Comparator.comparing(TableOrderMeal::getTotalPrice).reversed());
    }

    private List<Top5MealsDTO> getTop5Meals(List<Order> orders, Comparator<TableOrderMeal> comparator) {
        return getDailyMealsStatistics(orders).entrySet().stream()
                .sorted(Map.Entry.comparingByValue(comparator))
                .limit(5)
                .map(entry -> Top5MealsDTO.builder()
                        .name(entry.getKey())
                        .price(entry.getValue().getMealPrice().toString())
                        .quantity(entry.getValue().getQuantity())
                        .build())
                .collect(Collectors.toList());
    }

    private List<DailyMealsStatisticsDTO> getDailyMealsStatistics(Map<LocalDate, DailyMealStatistics> dailyStatsMap) {
        return dailyStatsMap.entrySet().stream()
                .map(entry -> DailyMealsStatisticsDTO.builder()
                        .date(entry.getKey())
                        .quantity(entry.getValue().getQuantity())
                        .duration(String.valueOf(entry.getValue().getQuantity() != 0 ? entry.getValue().getTime().dividedBy(entry.getValue().getQuantity()).toMinutes() : Duration.ZERO))
                        .build())
                .sorted(Comparator.comparing(DailyMealsStatisticsDTO::getDate))
                .collect(Collectors.toList());
    }

    private MealsStatisticDTO getMealsStatistics(List<Order> orders, OffsetDateTime startDate, OffsetDateTime endDate) {
        DailyMealsStatistics dailyMealsStatistics = new DailyMealsStatistics(startDate, endDate);
        for (Order order : orders) {
            for (OrderMeal meal : order.getOrderMeals()) {
                dailyMealsStatistics.addMeal(meal, order.getCompletedDateTime().toLocalDate());
            }
        }
        return MealsStatisticDTO.builder()
                .totalSoldMeals(dailyMealsStatistics.getTotalQuantity())
                .averageDailySoldMeals(dailyMealsStatistics.getAverageDailySoldMealsQuantity())
                .mostSalesMeal(getMostSalesMeals(orders))
                .highestIncomeMeal(getMostIncomeMeals(orders))
                .averageMealsPerOrder(orders.size() > 0 ? dailyMealsStatistics.getTotalQuantity() / orders.size() : 0)
                .averagePrepareMealTime(String.valueOf(dailyMealsStatistics.getAverageMealPrepareTime()))
                .dailyStatistics(getDailyMealsStatistics(dailyMealsStatistics.getDailyMealStatistics()))
                .build();
    }

    private OffsetDateTime getStartPeriod(String period, OffsetDateTime endDate) {
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