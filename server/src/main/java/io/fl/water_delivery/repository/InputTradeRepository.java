package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.InputTrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InputTradeRepository extends JpaRepository<InputTrade, UUID> {
}
