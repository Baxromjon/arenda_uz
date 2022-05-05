package io.fl.water_delivery.controller;

import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.ResidueDTO;
import io.fl.water_delivery.service.InputTradeService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * created by Baxromjon
 * 16.04.2022
 **/

@RestController
@RequestMapping("/api/inputProduct")
@CrossOrigin
public class InputTradeController {
    @Autowired
    InputTradeService inputTradeService;

    @GetMapping("/getByUserId/{id}")
    public HttpEntity<?> getAllByUserId(@PathVariable UUID id){
        return ResponseEntity.ok(inputTradeService.getAllByUserId(id));
    }

    @PostMapping("/calculateResidue")
    public HttpEntity<?> calcResidue(@RequestBody ResidueDTO residueDTO){
        ApiResponce apiResponce = inputTradeService.calcResidue(residueDTO);
        return ResponseEntity.status(apiResponce.isSuccess()? HttpStatus.OK:HttpStatus.CONFLICT).body(apiResponce);
    }
}
