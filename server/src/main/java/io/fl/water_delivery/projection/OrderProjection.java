package io.fl.water_delivery.projection;

public interface OrderProjection {
    String getCreatedAt();
    String getWasGiven();
    String getProductName();
    String getFirstName();
    String getLastName();
    String getPhoneNumber();
    double getOrderPrice();

}
