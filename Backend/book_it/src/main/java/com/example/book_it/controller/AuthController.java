package com.example.book_it.controller;

import com.example.book_it.model.AuthResponse;
import com.example.book_it.model.User;
import com.example.book_it.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<AuthResponse> signUp(@RequestBody User user) {

        return ResponseEntity.ok(authService.signUp(user));
    }

    @PostMapping("/signIn")
    public ResponseEntity<AuthResponse> signIn(@RequestBody User user) {

        return ResponseEntity.ok(authService.signIn(user));
    }


}
