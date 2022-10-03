package io.fl.water_delivery.entity;

import io.fl.water_delivery.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
public class Order extends AbsEntity {
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "users_orders", joinColumns = {@JoinColumn(name = "order_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private List<User> users;
    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(name = "orders_products", joinColumns = {@JoinColumn(name = "order_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id")})
    private List<Product> products;

    @Column(nullable = false)
    private int wasGiven;//berildi, klientga nechta suv idish berilgan

    private double orderPrice;
}
