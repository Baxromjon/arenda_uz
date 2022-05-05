package io.fl.water_delivery.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * created by Baxromjon
 * 14.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResPagination {


    private Integer page;

    private Integer size;

    private Integer totalPages;

    private List<?> totalElements;

    private long count;

//    private Object object;
}
