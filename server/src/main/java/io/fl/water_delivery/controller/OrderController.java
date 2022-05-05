package io.fl.water_delivery.controller;

import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.OrderDTO;
import io.fl.water_delivery.projection.OrderProjection1;
import io.fl.water_delivery.service.OrderService;
import io.fl.water_delivery.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * created by Baxromjon
 * 12.04.2022
 **/

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/getAllOrders")
    public HttpEntity<?> getAll(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                          @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(orderService.getAll(page, size));
    }
    @GetMapping("/getById/{id}")
    public HttpEntity<?> getByUserId(@PathVariable UUID id,@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                     @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size){
        return ResponseEntity.ok(orderService.getByUserId(id, page, size));
    }

    @PostMapping("/addOrder")
    public HttpEntity<?> add(@Valid @RequestBody OrderDTO orderDTO) {
        ApiResponce add = orderService.add(orderDTO);
        return ResponseEntity.status(add.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(add);
    }

    @GetMapping("/getCountOrder")
    public OrderProjection1 getCount(){
       return orderService.getCount();
    }

    @GetMapping("/getLastOrdersByUser")
    public HttpEntity<?> getLastOrders(){
        return ResponseEntity.ok(orderService.getLastOrdersByUser());
    }
}
