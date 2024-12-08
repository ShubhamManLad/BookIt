package com.example.book_it.repository;

import com.example.book_it.model.Ticket;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepo extends JpaRepository<Ticket, Integer> {

}
