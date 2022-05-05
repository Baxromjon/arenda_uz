package io.fl.water_delivery.controller;

import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.ProductDTO;
import io.fl.water_delivery.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/getAllProduct")
    public HttpEntity<?> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @PostMapping("/add")
    public HttpEntity<?> saveProduct(@Valid @RequestBody ProductDTO productDTO) {
        ApiResponce save = productService.save(productDTO);
        return ResponseEntity.status(save.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(save);
    }
    @GetMapping("/getById/{id}")
    public Product getById(@PathVariable UUID id){
        return productService.getById(id);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> editProduct(@PathVariable UUID id, @Valid @RequestBody ProductDTO productDTO) throws Exception {
        ApiResponce edit = productService.edit(id, productDTO);
        return ResponseEntity.status(edit.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(edit);
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponce delete = productService.delete(id);
        return ResponseEntity.status(delete.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(delete);
    }
}
