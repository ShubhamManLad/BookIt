package com.example.book_it.service;

import com.example.book_it.model.AuthResponse;
import com.example.book_it.model.User;
import com.example.book_it.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    JwtService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    public AuthResponse signUp(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = jwtService.generateToken(user);

        user = userRepo.save(user);

        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getName(), user.getUserRole());
    }

    public AuthResponse signIn(User user){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        Optional<User> newUser = userRepo.findByUsername(user.getUsername());
        String token = jwtService.generateToken(newUser.get());
        return new AuthResponse(token, newUser.get().getUsername(), newUser.get().getEmail(), newUser.get().getName(),newUser.get().getUserRole());
    }


}
