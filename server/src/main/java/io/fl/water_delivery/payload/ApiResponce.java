package io.fl.water_delivery.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponce {
    private boolean success;
    private String message;
    private Object object;

    public ApiResponce(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponce(boolean success, Object object) {
        this.success = success;
        this.object = object;
    }
}
