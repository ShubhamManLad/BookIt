package com.example.book_it.service;

import com.example.book_it.model.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);

}
