package com.example.RestaurantManagementSystem.infrastructure.database.entity;

import com.example.RestaurantManagementSystem.domain.TableStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_table")
public class TableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TableStatus status;

    @OneToMany(mappedBy = "table", fetch = FetchType.LAZY)
    private Set<OrderEntity> orders;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private RestaurantEntity restaurant;
}
