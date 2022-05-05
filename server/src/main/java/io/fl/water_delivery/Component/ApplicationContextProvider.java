package io.fl.water_delivery.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Component
public class ApplicationContextProvider implements ApplicationContextAware {
    private static ApplicationContext context;
    public ApplicationContext getApplicationContext(){
        return context;
    }
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

    }
}
