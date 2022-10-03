package io.fl.water_delivery.service;

import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.entity.enums.RoleName;
import io.fl.water_delivery.payload.*;
import io.fl.water_delivery.projection.UserProjection;
import io.fl.water_delivery.repository.ResidueProductRepository;
import io.fl.water_delivery.repository.RoleRepository;
import io.fl.water_delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    ResidueProductRepository residueProductRepository;

    public ResPagination getAllUsers(String search, int page, int size) {
        long count = userRepository.getCountUser();
        return new ResPagination(page, size, (int) count / size, userRepository.getAllUsers(search, page, size), count);
    }

    public ApiResponce addUser(UserDTO userDTO) {
        Boolean exists = userRepository.existsByPhoneNumber(userDTO.getPhoneNumber());
        if (exists)
            return new ApiResponce(false, "This user allready exists");
        User user = new User(
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getPhoneNumber(),
                userDTO.getAddress(),
                userDTO.getStreet(),
                userDTO.getHome(),
                userDTO.getDestination(),
                roleRepository.findByRole(RoleName.CLIENT)
        );
        userRepository.save(user);
        return new ApiResponce(true, "Successfully added");

    }

    public ApiResponce edit(UUID id, UserDTO userDTO) {
        Optional<User> optional = userRepository.findById(id);
        if (!optional.isPresent())
            return new ApiResponce(false, "User not found by given Id");

        User user = optional.get();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setStreet(userDTO.getStreet());
        user.setHome(userDTO.getHome());
        user.setDestination(userDTO.getDestination());
        userRepository.save(user);
        return new ApiResponce(true, "Successfully edited");
    }

    public ApiResponce delete(UUID id) {
//        try {
//            residueProductRepository.deleteResidueByUserId(id);
//            residueProductRepository.deleteUserOrderByUerId(id);
            userRepository.deleteById(id);
//            Optional<User> optional = userRepository.findById(id);
//            User user = optional.get();
//            user.setEnabled(false);
//            userRepository.save(user);
            return new ApiResponce(true, "successfully deleted");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new ApiResponce(false, "Error in delete");
    }

    public ApiResponce editAdmin(User user, AdminDTO adminDTO) {
        Optional<User> optional = userRepository.findById(user.getId());
        if (!optional.isPresent())
            return new ApiResponce(false, "User not found");

        User user1 = optional.get();
        user1.setFirstName(adminDTO.getFirstName());
        user1.setLastName(adminDTO.getLastName());
        user1.setPhoneNumber(adminDTO.getPhoneNumber());
        userRepository.save(user1);
        return new ApiResponce(true, "Successfully edited");
    }

    public ApiResponce editPassword(User user, PasswordDTO passwordDTO) {
        Optional<User> optional = userRepository.findById(user.getId());
        if (passwordEncoder.matches(passwordDTO.getOldPassword(), user.getPassword())) {
            if (!optional.isPresent()) {
                return new ApiResponce(false, "User not found by given Id");
            }
            if (passwordDTO.getPassword().equals(passwordDTO.getPrePassword())) {
                User user1 = optional.get();
                user1.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));
                userRepository.save(user1);
                return new ApiResponce(true, "Successfully edited");
            } else {
                return new ApiResponce(false, "ma`lumot kiritishda xatolik");
            }
        }
        return new ApiResponce(false, "Wrong password");
    }

    public double getTotalPrice(UUID id) {
        return userRepository.getTotalPriceByUserId(id);
    }
}
