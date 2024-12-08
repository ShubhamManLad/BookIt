package com.example.book_it.service;


import ch.qos.logback.core.testUtil.RandomUtil;
import com.example.book_it.model.*;
import com.example.book_it.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    EventRepo eventRepo;

    @Autowired
    TicketRepo ticketRepo;

    @Autowired
    FeedbackRepo feedbackRepo;
    
    public Event addEvent(Event event){
        event.setSelectedSeats("");
        event = eventRepo.save(event);
        return event;
    }

    public List<Event> getEvents(){
        List<Event> events = new ArrayList<>();
        eventRepo.findAll(Sort.by(Sort.Direction.DESC, "date")).forEach(event -> {events.add(event);});

        return events;
    }

    public List<Event> getOrgEvents(int orgId){
        List<Event> events = new ArrayList<>();
        eventRepo.findAll(Sort.by(Sort.Direction.DESC, "date")).forEach(event -> {if(event.getOrganizerId() == orgId)events.add(event);});

        return events;
    }

    public List<Event> getTypeEvents(String type){
        List<Event> events = new ArrayList<>();
        eventRepo.findAll(Sort.by(Sort.Direction.DESC, "date")).forEach(event -> {if(event.getType().contains(type))events.add(event);});

        return events;
    }

    public Event getEvent(int id){
        return eventRepo.findById(id).get();
    }

    public Event updateEvent(int id, Event event){
        Optional<Event> oldEvent = eventRepo.findById(id);
        if(oldEvent.isPresent()){
            Event updatedEvent = oldEvent.get();
            updatedEvent.setDate(event.getDate());
            updatedEvent.setDescription(event.getDescription());
            updatedEvent.setTitle(event.getTitle());
            updatedEvent.setType(event.getType());
            updatedEvent.setLocation(event.getLocation());
            updatedEvent.setAvailableSeats(event.getAvailableSeats());
            updatedEvent.setTicketPrice(event.getTicketPrice());
            updatedEvent.setTotalSeats(event.getTotalSeats());
            event = eventRepo.save(updatedEvent);
            return event;
        }
        return null;
    }

    public Ticket getTicket(Integer ticketId){
        return ticketRepo.findById(ticketId).get();
    }

    public Ticket bookTicket(Ticket ticket, String userName){

        ticket.setUserId(userRepo.findByUsername(userName).get().getUserId());
        ticket.setPaymentStatus("PENDING");
        ticket.setTicketPrice(eventRepo.findById(ticket.getEventId()).get().getTicketPrice() * ticket.getNumPpl());
        return ticketRepo.save(ticket);
    }

    public List<TicketResponse> getUserTickets(int userId){
        List<TicketResponse> tickets = new ArrayList<>();
        ticketRepo.findAll(Sort.by(Sort.Direction.DESC, "bookingDate")).forEach(ticket -> {
            if(ticket.getUserId()==userId)tickets.add(new TicketResponse(ticket, eventRepo.findById(ticket.getEventId()).get().getTitle(),0,""));
        });
        return tickets;
    }

    public Ticket payTicket(int ticketId){
        Ticket ticket = ticketRepo.findById(ticketId).get();
        Event event = eventRepo.findById(ticket.getEventId()).get();
        if(event.getAvailableSeats()>ticket.getNumPpl()){
            event.setAvailableSeats(event.getAvailableSeats()-ticket.getNumPpl());
            for(String seat: ticket.getSeatNumber().split(",")){
                if(event.getSelectedSeats().contains(seat)){
                    ticket.setPaymentStatus("FAILED: Seat unavailable");
                    ticket = ticketRepo.save(ticket);
                    return ticket;
                }
            }
            String seats = (event.getSelectedSeats().isEmpty())?ticket.getSeatNumber(): event.getSelectedSeats()+","+ticket.getSeatNumber();
            event.setSelectedSeats(seats);
            ticket.setPaymentStatus("PAID");
            updateEvent(event.getEventId(), event);
            ticket = ticketRepo.save(ticket);
            return ticket;
        }
        else{
            ticket.setPaymentStatus("FAILED");
            ticket = ticketRepo.save(ticket);
            return ticket;

        }

    }

    public Ticket cancelTicket(int ticketId){
        Ticket ticket = ticketRepo.findById(ticketId).get();
        Event event = eventRepo.findById(ticket.getEventId()).get();
        event.setAvailableSeats(event.getAvailableSeats()+ticket.getNumPpl());
        for(String seat: ticket.getSeatNumber().split(",")){
            event.setSelectedSeats(event.getSelectedSeats().replace(seat,""));
        }
        ticket.setSeatNumber("-");
        ticket.setPaymentStatus("CANCELLED");
        updateEvent(event.getEventId(), event);
        ticket = ticketRepo.save(ticket);
        return ticket;
    }

    public Feedback addFeedback(Feedback feedback){
        Ticket ticket = ticketRepo.findById(feedback.getTicketId()).get();
        Event event = eventRepo.findById(ticket.getEventId()).get();
        feedback.setEventId(event.getEventId());
        feedback = feedbackRepo.save(feedback);
        return feedback;
    }







}
