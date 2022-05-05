package io.fl.water_delivery.entity;

import io.fl.water_delivery.entity.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "role")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private RoleName role;

    @Override
    public String getAuthority() {
        return this.role.toString();
    }

    public Role(RoleName role) {
        this.role = role;
    }

}
