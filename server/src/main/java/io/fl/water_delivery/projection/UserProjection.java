package io.fl.water_delivery.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface UserProjection {
    String getUserId();
    String getFirstName();
    String getLastName();
    String getPhoneNumber();
    String getAddress();
    String getStreet();
    String getHome();
    String getDestination();

    @Value("#{@residueProductRepository.getAllByUserId(target.userId)}")
    List<ResidueProjection> getResidues();

//    @Value(value = "#{@orderRepository.getTotalPriceByUserId(target.userId)}")
//    double getTotalPrice();
}
