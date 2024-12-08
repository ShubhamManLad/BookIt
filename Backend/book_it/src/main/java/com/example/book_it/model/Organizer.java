package com.example.book_it.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name= "organizers", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Organizer {

    @Id
    private Integer organizerId;

    private String username;


}
