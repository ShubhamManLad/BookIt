package com.example.book_it.repository;

import com.example.book_it.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event, Integer> {

}
