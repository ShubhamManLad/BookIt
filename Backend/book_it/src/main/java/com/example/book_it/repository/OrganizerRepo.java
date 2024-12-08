package com.example.book_it.repository;

import com.example.book_it.model.Organizer;
import com.example.book_it.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizerRepo extends JpaRepository<Organizer, Integer> {

}
