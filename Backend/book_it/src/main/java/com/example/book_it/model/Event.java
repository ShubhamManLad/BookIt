package com.example.book_it.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name= "events", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventId;

    private String title;

    private String description;

    private Integer organizerId;

    private String type;

    private Date date;

    private String location;

    private Integer availableSeats;

    private Integer totalSeats;

    private Integer ticketPrice;

    private String selectedSeats;
}
