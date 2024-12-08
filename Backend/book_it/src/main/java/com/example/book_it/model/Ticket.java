package com.example.book_it.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name= "tickets", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketId;

    private Integer userId;

    private Integer eventId;

    private String bookingName;

    private String seatNumber;

    private Integer numPpl;

    private Date bookingDate;

    private String paymentStatus;

    private Integer ticketPrice;

}
