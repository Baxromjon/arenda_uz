package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.Role;
import io.fl.water_delivery.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRole(RoleName roleName);
}
