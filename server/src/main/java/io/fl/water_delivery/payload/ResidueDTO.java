package io.fl.water_delivery.payload;

import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * created by Baxromjon
 * 16.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResidueDTO {
    private int amount;
    private UUID productId;
    private UUID userId;
}
