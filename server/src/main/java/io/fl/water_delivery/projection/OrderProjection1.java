package io.fl.water_delivery.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface OrderProjection1 {
    int getOrderCount();

    @Value(value = "#{@productRepository.getAllCount()}")
    List<ProductProjection> getProducts();

    @Value(value = "#{@userRepository.getAllUserCount()}")
    CountUserProjection getUserCount();

    @Value(value = "#{@orderRepository.getLastOrderCount()}")
    int getLastDayCount();
}
