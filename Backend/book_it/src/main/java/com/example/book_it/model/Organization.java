package com.example.book_it.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name= "organizations", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Organization {

    @Id
    private Integer userId;

    private Integer organizerId;



}