package io.fl.water_delivery.projection;

import java.util.UUID;

public interface ProductProjection {
    UUID getId();

    double getPrice();

    int getAmount();

    String getProductName();

    int getResidue();
}
