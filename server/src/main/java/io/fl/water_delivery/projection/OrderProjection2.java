package io.fl.water_delivery.projection;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;
import java.util.UUID;

public interface OrderProjection2 {
    UUID getUserId();

    Timestamp getCreatedAt();

    double getOrderPrice();

    int getWasGiven();

    String getProductName();
}
