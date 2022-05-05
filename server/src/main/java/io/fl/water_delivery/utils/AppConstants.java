package io.fl.water_delivery.utils;

import org.springframework.data.domain.Sort;

public interface AppConstants {

    String DEFAULT_PAGE_NUMBER = "0";
    String DEFAULT_PAGE_SIZE = "10";
    String DEFAULT_DYNAMICPAGE_SIZE = "12";

    String COLUMN_NAME_FOR_SORT = "createdAt";
    Sort.Direction ASC_OR_DECK = Sort.Direction.ASC;
}
