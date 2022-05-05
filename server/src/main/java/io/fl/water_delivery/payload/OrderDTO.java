package io.fl.water_delivery.payload;

import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * created by Baxromjon
 * 12.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private UUID userId;
    private User user;
    private UUID productId;
    @NotNull
    private int wasGiven;
    private double orderPrice;

    public OrderDTO(UUID userId, UUID productId, int wasGiven) {
        this.userId = userId;
        this.productId = productId;
        this.wasGiven = wasGiven;
    }

    public OrderDTO(UUID userId, UUID productId, int wasGiven, double orderPrice) {
        this.userId = userId;
        this.productId = productId;
        this.wasGiven = wasGiven;
        this.orderPrice = orderPrice;
    }
}
