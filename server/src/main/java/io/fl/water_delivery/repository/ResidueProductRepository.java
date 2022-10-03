package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.ResidueProduct;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.projection.ResidueProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResidueProductRepository extends JpaRepository<ResidueProduct, UUID> {

    @Query(nativeQuery = true, value = "select rp.amount as amount, cast(p.id as varchar) as id, p.name as productName\n" +
            "from residue_product rp\n" +
            "         inner join product p on p.id = rp.product_id\n" +
            "where rp.user_id = :userId")
    List<ResidueProjection> getAllByUserId(UUID userId);

    Optional<ResidueProduct> getAllByUserIdAndProductId(UUID user_id, UUID product_id);

    @Query(nativeQuery = true, value = "delete from residue_product\n" +
            "where user_id=:uuid")
    void deleteResidueByUserId(UUID uuid);

    @Query(nativeQuery = true, value = "delete from users_orders\n" +
            "where user_id=:uuid")
    void deleteUserOrderByUerId(UUID uuid);
}
