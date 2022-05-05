package io.fl.water_delivery.service;

import io.fl.water_delivery.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    public UserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        return userRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new UsernameNotFoundException("userId"));
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByPhoneNumber(s);
    }

}
