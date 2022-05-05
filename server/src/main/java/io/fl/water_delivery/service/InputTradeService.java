package io.fl.water_delivery.service;

import io.fl.water_delivery.entity.InputTrade;
import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.entity.ResidueProduct;
import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.ResidueDTO;
import io.fl.water_delivery.repository.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * created by Baxromjon
 * 16.04.2022
 **/

@Service
public class InputTradeService {
    @Autowired
    InputTradeRepository inputTradeRepository;
    @Autowired
    OutputTradeRepository outputTradeRepository;
    @Autowired
    ResidueProductRepository residueProductRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;

    public List<?> getAllByUserId(UUID id) {
        return residueProductRepository.getAllByUserId(id);
    }

    public ApiResponce calcResidue(ResidueDTO residueDTO) {
        Optional<ResidueProduct> optional = residueProductRepository.getAllByUserIdAndProductId(residueDTO.getUserId(), residueDTO.getProductId());
        Optional<Product> productOptional = productRepository.findById(residueDTO.getProductId());
        if (!optional.isPresent())
            return new ApiResponce(false, "Not found");
        ResidueProduct residueProduct = optional.get();
        if ((residueProduct.getAmount() - residueDTO.getAmount()) < 0) {
            return new ApiResponce(false, "Mijozda qaytariladigan mahsulot soni kamroq");
        }
        residueProduct.setAmount(residueProduct.getAmount() - residueDTO.getAmount());
        residueProductRepository.save(residueProduct);
        Product product = productOptional.get();
        product.setResidue(product.getResidue() + residueDTO.getAmount());
        productRepository.save(product);
        Optional<User> userOptional = userRepository.findById(residueDTO.getUserId());
        InputTrade inputTrade = new InputTrade(
                residueDTO.getAmount(), userOptional.get(), product, LocalDate.now()
        );
        inputTradeRepository.save(inputTrade);
        return new ApiResponce(true, "Muvaffaqqiyatli amalga oshirildi");
    }
}
