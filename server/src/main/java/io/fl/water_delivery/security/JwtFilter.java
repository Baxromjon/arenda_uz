package io.fl.water_delivery.security;

import io.fl.water_delivery.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //O'ZIMIZ YOZGAN METHOD. MAQSAD USER(USERDETAILS) NI OLISH
        UserDetails userDetails = getUserDetails(request);
        //BEARE TOKEN YOKI BASIC TOKEN ORQALI TEKSHIRILIB OLINGAN USER
        if (userDetails != null) {
            if (userDetails.isEnabled()
                    && userDetails.isAccountNonExpired()
                    && userDetails.isAccountNonLocked()
                    && userDetails.isCredentialsNonExpired()) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);

    }
    public UserDetails getUserDetails(HttpServletRequest httpServletRequest) {
        try {
            String tokenClient = httpServletRequest.getHeader("Authorization");
            if (tokenClient != null) {
                if (tokenClient.startsWith("Bearer ")) {
                    tokenClient = tokenClient.substring(7);
                    if (jwtTokenProvider.validateToken(tokenClient)) {
                        String userIdFromToken = jwtTokenProvider.getUserIdFromToken(tokenClient);
                        return authService.loadUserByUserId(userIdFromToken);
                    } else if (tokenClient.startsWith("Basic ")) {
                        String[] userUserNameAndPassword = getUserNameAndPassword(tokenClient);
                        UserDetails userDetails = authService.loadUserByUsername(userUserNameAndPassword[0]);
                        if (userDetails != null && passwordEncoder.matches(userUserNameAndPassword[1], userDetails.getPassword()))
                            return userDetails;
                    }

                }
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    public String[] getUserNameAndPassword(String token) {
        String base64Credentials = token.substring("Basic".length()).trim();
        byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(credDecoded, StandardCharsets.UTF_8);
        return credentials.split(":", 2);
    }

}
