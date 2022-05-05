package io.fl.water_delivery.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * created by Baxromjon
 * 15.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordDTO {
    private String oldPassword;
    private String password;
    private String prePassword;
}
