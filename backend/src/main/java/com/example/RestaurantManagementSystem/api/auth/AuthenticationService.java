package com.example.RestaurantManagementSystem.api.auth;

import com.example.RestaurantManagementSystem.business.RestaurantOwnerService;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import com.example.RestaurantManagementSystem.infrastructure.security.JwtService;
import com.example.RestaurantManagementSystem.infrastructure.security.Role;
import com.example.RestaurantManagementSystem.infrastructure.security.User;
import com.example.RestaurantManagementSystem.infrastructure.security.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RestaurantOwnerService restaurantOwnerService;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {

        Optional<User> existingUser = repository.findByEmail(request.getEmail());
        if (existingUser.isPresent())
            throw new ObjectAlreadyExist("User with this email already exist!");
        var user = buildUser(request);
        repository.save(user);

        restaurantOwnerService.createRestaurantOwner(request.getEmail(), request.getRestaurantName());
        String restaurantName = "Italiano";
        if (user.getRole().equals(Role.ADMIN)) {
            restaurantName = "Italiano";
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .email(user.getEmail())
                .restaurantName(restaurantName)
                .build();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Can not found user with this email"));
        var jwtToken = jwtService.generateToken(user);
        String restaurantName = "Italiano";
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .email(user.getEmail())
                .restaurantName(restaurantName)
                .build();
    }

    private User buildUser(RegisterRequest request) {
        return User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .build();
    }

}
