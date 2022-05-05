package io.fl.water_delivery.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * created by Baxromjon
 * 12.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    @NotNull
    private String name;
    private String description;
    @NotNull
    private Integer amount;
    @NotNull
    private double price;
}
