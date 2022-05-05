package io.fl.water_delivery.projection;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;

public interface UsersOrderProjection {
    Timestamp getDay();

    String getUserId();

    String getFirstName();

    String getLastName();

    String getPhoneNumber();

    @Value(value = "#{@orderRepository.getProductByUserId(target.userId)}")
    UserOrderProjection getProduct();
}
