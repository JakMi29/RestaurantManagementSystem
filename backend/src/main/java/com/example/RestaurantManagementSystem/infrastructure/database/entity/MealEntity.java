package com.example.RestaurantManagementSystem.infrastructure.database.entity;

import com.example.RestaurantManagementSystem.domain.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meal")
public class MealEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name="name")
    private String name;
    @Column(name="price")
    private BigDecimal price;
    @Column(name="image")
    private String image;
    @Column(name="description")
    private String description;
    @Column(name="meal_of_the_day")
    private Boolean mealOfTheDay;
    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private RestaurantEntity restaurant;
}
