package com.example.RestaurantManagementSystem.infrastructure.security;

import org.springframework.context.annotation.Profile;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Profile("aws")
public class CognitoRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<String> groups = jwt.getClaimAsStringList("cognito:groups");
        if (groups == null || groups.isEmpty()) {
            return Collections.emptyList();
        }

        return groups.stream()
                .map(group -> new SimpleGrantedAuthority(group.toUpperCase()))
                .collect(Collectors.toList());
    }
}