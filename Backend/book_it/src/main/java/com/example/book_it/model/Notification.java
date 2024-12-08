package com.example.book_it.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name= "notifications", schema="dbo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notificationId;

    private String email;

    private Integer eventId;

}
