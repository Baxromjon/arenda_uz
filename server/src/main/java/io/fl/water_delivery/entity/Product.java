package io.fl.water_delivery.entity;

import io.fl.water_delivery.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends AbsEntity {
    private String name;
    private String description;
    private int amount;
    private int residue;//qoldiq
    private double price;


    public Product(String name, String description, int amount) {
        this.name = name;
        this.description = description;
        this.amount = amount;
    }

    public Product(String name, String description, int amount, double price) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.price = price;
    }
}
