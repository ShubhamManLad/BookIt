package com.example.book_it.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name= "feedbacks", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Feedback {

    @Id
    private Integer ticketId;

    private Integer eventId;

    private Integer rating;

    private String feedbackMsg;
}
