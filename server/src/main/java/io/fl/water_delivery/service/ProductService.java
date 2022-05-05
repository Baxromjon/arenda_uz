package io.fl.water_delivery.service;

import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.ProductDTO;
import io.fl.water_delivery.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public ApiResponce getAll() {
        List<Product> all = productRepository.findAll();
        return new ApiResponce(true, all);
    }

    public ApiResponce save(ProductDTO productDTO) {
        Boolean exists = productRepository.existsByName(productDTO.getName());
        if (exists)
            return new ApiResponce(false, "allReady exists");

        Product product = new Product(
                productDTO.getName(), productDTO.getDescription(), productDTO.getAmount(), productDTO.getAmount(), productDTO.getPrice()
        );
        productRepository.save(product);
        return new ApiResponce(true, "Successfully added");
    }

    public ApiResponce edit(UUID id, ProductDTO productDTO) {
        Optional<Product> optional = productRepository.findById(id);
        if (!optional.isPresent())
            return new ApiResponce(false, "Product not found by given Id");
        Product product = optional.get();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setAmount(productDTO.getAmount());
        product.setPrice(productDTO.getPrice());
        productRepository.save(product);
        return new ApiResponce(true, "Successfully edited");
    }

    public ApiResponce delete(UUID id) {
        try {
            productRepository.deleteById(id);
            return new ApiResponce(true, "Successfully deleted");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ApiResponce(false, "Error in delete");
    }

    public Product getById(UUID id) {
        Optional<Product> optional = productRepository.findById(id);
        return optional.get();
    }
}
