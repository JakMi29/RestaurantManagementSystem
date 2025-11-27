package com.example.RestaurantManagementSystem.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Profile("aws")
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AwsSecurityConfiguration {

    @Bean
    public JwtAuthenticationConverter cognitoJwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new CognitoRoleConverter());
        return converter;
    }

    @Bean
    @Order(1)
    @Profile("aws")
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(Customizer.withDefaults())
                .securityMatcher("/api/restaurantManagementSystem/aws/**")
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/restaurantManagementSystem/aws/**")
                        .authenticated())

                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt ->
                        jwt.jwtAuthenticationConverter(cognitoJwtAuthenticationConverter())
                ));
        return http.build();
    }
}