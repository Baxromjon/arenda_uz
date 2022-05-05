package io.fl.water_delivery.controller;

import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.LoginDTO;
import io.fl.water_delivery.repository.UserRepository;
import io.fl.water_delivery.security.JwtTokenProvider;
import io.fl.water_delivery.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    UserRepository userRepository;
//    @Autowired
//    AuthService authService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public HttpEntity<?> checkLogin(@Valid @RequestBody LoginDTO userDTO) {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            userDTO.getPhoneNumber(),
                            userDTO.getPassword()
                    ));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(user.getId());
            return ResponseEntity.status(200).body(new ApiResponce(true, "Successfully", token));
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return ResponseEntity.status(409).body(new ApiResponce(false, "Bad Credentials"));
    }

}
