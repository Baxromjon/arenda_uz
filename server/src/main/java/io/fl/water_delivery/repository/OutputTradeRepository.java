package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.OutputTrade;
import io.fl.water_delivery.projection.OutputTradeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface OutputTradeRepository extends JpaRepository<OutputTrade, UUID> {
    @Query(nativeQuery = true, value = "select ot.amount as amount, p.name as productName\n" +
            "from output_trade ot\n" +
            "         inner join product p on p.id = ot.product_id\n" +
            "where ot.user_id = :userId")
    List<OutputTradeProjection> getAllByUserId(UUID userId);
}
