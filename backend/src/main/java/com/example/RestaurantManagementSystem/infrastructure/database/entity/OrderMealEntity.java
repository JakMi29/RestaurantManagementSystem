package com.example.RestaurantManagementSystem.infrastructure.database.entity;

import com.example.RestaurantManagementSystem.domain.OrderMealStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_meal")
public class OrderMealEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "received_date_time")
    private OffsetDateTime receivedDateTime;

    @Column(name = "completed_date_time")
    private OffsetDateTime completedDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderMealStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_id")
    private MealEntity meal;
}
