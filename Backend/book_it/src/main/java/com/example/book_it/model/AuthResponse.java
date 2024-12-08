package com.example.book_it.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String token;
//    private User user;

    private String username;

    private String email;

    private String name;

    private String userRole;

}
