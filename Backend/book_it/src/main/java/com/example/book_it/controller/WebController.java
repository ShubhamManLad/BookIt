package com.example.book_it.controller;

import com.example.book_it.model.*;
import com.example.book_it.repository.UserRepo;
import com.example.book_it.service.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Log
@RestController
public class WebController {

    @Autowired
    UserRepo repo;

    @Autowired
    EventService eventService;

    @Autowired
    OrganizerService organizerService;


    @Autowired
    JwtService jwtService;


    @Autowired
    EmailService emailService;

    @Autowired
    NotificationService notificationService;

    @GetMapping("/health")
    public ResponseEntity<List<User>> hello() {
        List<User> res = new ArrayList<>();
        repo.findAll().forEach(book->{res.add(book);});
        log.info(res.size()+"");
        log.info(res.get(0).toString());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/admin/createOrganization")
    public ResponseEntity<Organizer>createOrganization(@RequestBody Organizer organizer, @RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int orgId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        organizer.setOrganizerId(orgId);
        System.out.println(organizer.getOrganizerId()+organizer.getUsername());
        return ResponseEntity.ok(organizerService.createOrganizer(organizer));
    }

    @GetMapping("/getOrganizationName")
    public ResponseEntity<Organizer>getOrganization(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int orgId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        return ResponseEntity.ok(organizerService.findOrganizerById(orgId));

    }

    @PostMapping("/staff/joinOrganization")
    public ResponseEntity joinOrganization(@RequestBody Organizer organizer, @RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int userId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        int orgId = organizerService.findOrganizerByName(organizer.getUsername());
        organizerService.joinOrganization(userId, orgId);
        return new ResponseEntity(HttpStatus.OK);

    }

    @GetMapping("/staff/getOrganization")
    public ResponseEntity<Organizer> getStaffOrganization(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int userId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        return ResponseEntity.ok(organizerService.getStaffOrganization(userId));

    }

    @GetMapping("/staff/getEvents")
    public ResponseEntity<List<Event>> getStaffEvents(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int userId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        Organizer organizer = organizerService.getStaffOrganization(userId);
        return ResponseEntity.ok(eventService.getOrgEvents(organizer.getOrganizerId()));

    }

    @DeleteMapping("/staff/leaveOrganization")
    public ResponseEntity leaveOrganization(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int userId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        organizerService.leaveOrganization(userId);
        return  new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/admin/getStaff")
    public ResponseEntity<List<User>> getStaff(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int orgId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        return ResponseEntity.ok(organizerService.getStaff(orgId));
    }

    @DeleteMapping("/admin/removeStaff/{empId}")
    public ResponseEntity removeStaff(@PathVariable String empId){
        organizerService.removeStaff(empId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/admin/addEvent")
    public ResponseEntity<Event> addEvent(@RequestHeader (name="Authorization") String token, @RequestBody Event event){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int orgId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        event.setOrganizerId(orgId);
        return ResponseEntity.ok(eventService.addEvent(event));
    }

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getEvents(){
        return ResponseEntity.ok(eventService.getEvents());
    }

    @GetMapping("/getOrgEvents")
    public ResponseEntity<List<Event>> getOrgEvents(@RequestHeader (name="Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        int orgId = repo.findByUsername(jwtService.extractUsername(token)).get().getUserId();
        return ResponseEntity.ok(eventService.getOrgEvents(orgId));
    }

    @GetMapping("/getEvents/{type}")
    public ResponseEntity<List<Event>> getTypeEvents(@PathVariable String type){
        return ResponseEntity.ok(eventService.getTypeEvents(type));
    }

    @GetMapping("/getEvent/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable int id){
        return ResponseEntity.ok(eventService.getEvent(id));
    }


    @PutMapping("/admin/updateEvent/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable int id, @RequestBody Event event){
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @PostMapping("/bookTicket")
    public ResponseEntity<TicketResponse> bookTicket(@RequestBody Ticket ticket, @RequestHeader (name="Authorization") String token){
        token = token.substring(7);
        String username = jwtService.extractUsername(token);
        System.out.println(username);

        return ResponseEntity.ok(new TicketResponse(eventService.bookTicket(ticket, username), eventService.getEvent(ticket.getEventId()).getTitle(),0,""));
    }

    @GetMapping("/getTickets")
    public ResponseEntity<List<TicketResponse>> getUserTickets(@RequestHeader (name="Authorization") String token){
        token = token.substring(7);
        String username = jwtService.extractUsername(token);
        System.out.println(username);
        return ResponseEntity.ok(eventService.getUserTickets(repo.findByUsername(username).get().getUserId()));

    }

    @GetMapping("/getTickets/{eventId}")
    public ResponseEntity<List<TicketResponse>> getEventTickets(@PathVariable int eventId, @RequestHeader (name="Authorization") String token){
        token = token.substring(7);
        String username = jwtService.extractUsername(token);
        System.out.println(username);
        return ResponseEntity.ok(organizerService.getTickets(eventId));

    }

    @PostMapping("/payTicket/{ticketId}")
    public ResponseEntity<Ticket> payTicket(@PathVariable int ticketId, @RequestHeader (name="Authorization") String token){
        token = token.substring(7);
        String username = jwtService.extractUsername(token);
        Ticket paidTicket = eventService.payTicket(ticketId);
        if(paidTicket!=null){
            User user = repo.findByUsername(username).get();
            Event event = eventService.getEvent(paidTicket.getEventId());

            EmailDetails details = new EmailDetails();
            details.setRecipient(user.getEmail());
            details.setSubject("Booking Confirmation for "+event.getTitle());
            details.setMsgBody("Booking details\n"+
                    "Event date: "+event.getDate().toString()+"\n"+
                    "No. of people: "+paidTicket.getNumPpl()+"\n"+
                    "Seat number: "+paidTicket.getSeatNumber()+"\n"+
                    "Ticket Price: "+paidTicket.getTicketPrice()
            );

            String status = emailService.sendSimpleMail(details);
            System.out.println(status);
            return ResponseEntity.ok(paidTicket);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/cancelTicket/{ticketId}")
    public ResponseEntity<Ticket> cancelTicket(@PathVariable int ticketId){
        List<Notification> notifications = new ArrayList<>();
        Ticket ticket = eventService.getTicket(ticketId);

        notifications = notificationService.getNotifications(ticket.getEventId());
        Event event = eventService.getEvent(ticket.getEventId());

        for(Notification notification: notifications){
            EmailDetails details = new EmailDetails();
            details.setRecipient(notification.getEmail());
            details.setSubject("Tickets available for "+event.getTitle());
            details.setMsgBody("Tickets for "+event.getTitle()+" are now available. Go to website now  to book tickets before they fill up again."
            );

            String status = emailService.sendSimpleMail(details);
            System.out.println(status);
        }
        return ResponseEntity.ok(eventService.cancelTicket(ticketId));
    }

    @PostMapping("/sendFeedback")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback){
        return ResponseEntity.ok(eventService.addFeedback(feedback));
    }

    @PostMapping("/addNotification")
    public ResponseEntity<Notification> addNotification(@RequestBody Notification notification){
        return ResponseEntity.ok(notificationService.addNotification(notification));
    }

}

/*
   SignUp -> SignIn  -> User -> View Events
                             -> Filter Events : Location, Date, Type
                             -> Book Event : Check Availability, Select Seat,
                             -> Payment : Type of Payment, Payment Status, Confirm Seat
                             -> View Tickets
                             -> Cancel Tickets

                     -> Admin -> Create Organization
                              -> View Employees
                              -> Create Event
                              -> View Event Details
                              -> Update Event
                              -> Cancel Event

                     -> Staff -> Join Organization
                              -> Check Tickets (BookingId)

*/