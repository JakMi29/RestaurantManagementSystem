package com.example.RestaurantManagementSystem.business;

import java.time.OffsetDateTime;
import java.util.Random;

public class OrderNumberGenerator {
    public static String generateOrderNumber(OffsetDateTime when) {
        return "ORD%s%s%s%s%s%s%s".formatted(
                when.getMonth().ordinal(),
                when.getYear(),
                when.getHour(),
                when.getDayOfMonth(),
                when.getSecond(),
                when.getMinute(),
                randomInt(10, 100)
        );
    }

    private static int randomInt(int min, int max) {
        return new Random().nextInt(max - min) + min;
    }

}