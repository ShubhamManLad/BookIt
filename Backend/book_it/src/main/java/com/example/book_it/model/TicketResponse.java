package com.example.book_it.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TicketResponse {
    private Integer ticketId;

    private Integer userId;

    private Integer eventId;

    private String eventName;

    private String bookingName;

    private List<String> seatNumber;// [1,2,3,4]

    private Integer numPpl;

    private Date bookingDate;

    private String paymentStatus;

    private Integer ticketPrice;

    private Integer rating;

    private String feedbackMsg;

    public TicketResponse(Ticket ticket, String eventName, int rating, String feedbackMsg){
        this.ticketId = ticket.getTicketId();
        this.userId = ticket.getUserId();
        this.eventId = ticket.getEventId();
        this.eventName = eventName;
        this.bookingName = ticket.getBookingName();
        this.seatNumber = List.of(ticket.getSeatNumber().split(","));
        this.numPpl = ticket.getNumPpl();
        this.bookingDate = ticket.getBookingDate();
        this.paymentStatus = ticket.getPaymentStatus();
        this.ticketPrice = ticket.getTicketPrice();
        this.rating = rating;
        this.feedbackMsg = feedbackMsg;
    }
}
