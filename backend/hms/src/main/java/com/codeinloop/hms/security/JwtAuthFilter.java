package com.codeinloop.hms.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        //skip if no bearer token present
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            log.debug("No Bearer token found in request for {} {}", request.getMethod(), request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if(jwtUtil.isTokenValid(token)){
            String email = jwtUtil.extractEmail(token);

            //only set auth if not already authenticated
            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
                try {
                    log.debug("JWT valid - loading user details for {}", email);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    log.debug("UserDetails loaded for {} - authorities={}", email, userDetails.getAuthorities());

                    // create authentication token and set it in context
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.info("Authentication set for user {} with authorities={}", email, userDetails.getAuthorities());
                } catch (UsernameNotFoundException e){
                    log.warn("JWT authentication failed - user not found: {}", email);
                }
            }
        } else {
            log.debug("Invalid or expired JWT token for request {} {}", request.getMethod(), request.getRequestURI());
        }

        // always continue the filter chain
        filterChain.doFilter(request, response);
    }
}
