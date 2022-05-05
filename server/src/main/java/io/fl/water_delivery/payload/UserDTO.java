package io.fl.water_delivery.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * created by Baxromjon
 * 12.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String street;
    private String home;
    private String destination;

}
