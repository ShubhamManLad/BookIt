package com.example.book_it.repository;

import com.example.book_it.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepo extends JpaRepository<Organization, Integer> {

}
