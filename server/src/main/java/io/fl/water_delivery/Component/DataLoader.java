package io.fl.water_delivery.Component;

import io.fl.water_delivery.entity.Role;
import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.entity.enums.RoleName;
import io.fl.water_delivery.repository.RoleRepository;
import io.fl.water_delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RoleRepository roleRepository;

    @Value(value = "${spring.sql.init.mode}")
    private String initialMode;

    @Override
    public void run(String... args){
        if (initialMode.equals("always")){
//            RoleName[] roleNames = RoleName.values();
//            List<Role> roles = new ArrayList<>();
//            for (RoleName name : roleNames) {
//                roles.add(new Role(name));
//                roleRepository.saveAll(roles);
//            }
            Role superAdminRole=new Role(RoleName.SUPER_ADMIN);
            Role adminRole=new Role(RoleName.ADMIN);
            Role client=new Role(RoleName.CLIENT);
            List<Role> roleList=Arrays.asList(superAdminRole, adminRole, client);
            roleRepository.saveAll(roleList);

            User superAdmin=new User(
                   "SuperAdmin",
                   "SuperAdmin",
                   "+998990068005",
                    passwordEncoder.encode("root123"),
                    roleRepository.findByRole(RoleName.SUPER_ADMIN)
            );
            User admin=new User(
                    "Admin",
                    "Admin",
                    "+998971234567",
                    passwordEncoder.encode("root123"),
                    roleRepository.findByRole(RoleName.ADMIN)
            );
            List<User> users= Arrays.asList(superAdmin, admin);
            userRepository.saveAll(users);
        }
    }
}
