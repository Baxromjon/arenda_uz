package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.Product;
import io.fl.water_delivery.projection.ProductProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    Boolean existsByName(String name);

    @Query(nativeQuery = true, value = "select cast(p.id as varchar) as id, p.price as price, p.amount as amount, p.name as productName, p.residue as residue\n" +
            "from product p")
    List<ProductProjection> getAllCount();
}
