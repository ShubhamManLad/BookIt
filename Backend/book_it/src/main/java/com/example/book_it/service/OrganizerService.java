package com.example.book_it.service;

import com.example.book_it.model.*;
import com.example.book_it.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizerService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    EventRepo eventRepo;

    @Autowired
    TicketRepo ticketRepo;

    @Autowired
    OrganizationRepo orgRepo;

    @Autowired
    OrganizerRepo organizerRepo;

    @Autowired
    FeedbackRepo feedbackRepo;

    public Organizer createOrganizer(Organizer organizer){
        organizer = organizerRepo.save(organizer);
        return organizer;
    }
    
    public Organization joinOrganization(Integer userId, Integer orgId){
        Organization organization = new Organization(userId, orgId);
        return orgRepo.save(organization);
    }

    public Organizer getStaffOrganization(Integer userId){
        Organization organization = orgRepo.findById(userId).get();
        return organizerRepo.findById(organization.getOrganizerId()).get();
    }

    public void removeStaff(String username){
        Integer userId = userRepo.findByUsername(username).get().getUserId();
        System.out.println("User"+username+userId);
        orgRepo.deleteById(userId);
    }

    public void leaveOrganization(Integer userId){
        orgRepo.deleteById(userId);
    }

    public Organizer findOrganizerById(int id){
        return organizerRepo.findById(id).get();
    }

    public int findOrganizerByName(String name){
        List<Organizer> organizers = new ArrayList<>();
        organizerRepo.findAll().forEach(
                (organizer -> {
                    organizers.add(organizer);

                })
        );
        for(Organizer organizer : organizers){
            if(organizer.getUsername().trim().contentEquals(name.trim())){
                return organizer.getOrganizerId();
            }
        }
        return 0;
    }

    public List<TicketResponse> getTickets(Integer eventId){
        List<TicketResponse> tickets = new ArrayList<>();
        ticketRepo.findAll(Sort.by("bookingDate")).forEach(ticket -> {
            if(ticket.getEventId()==eventId){
                Feedback feedback = new Feedback();
                feedback.setTicketId(ticket.getTicketId());
                feedback.setEventId(eventId);
                feedback.setRating(0);
                feedback.setFeedbackMsg("");
                if(feedbackRepo.findById(ticket.getTicketId()).isPresent()){
                    feedback = feedbackRepo.findById(ticket.getTicketId()).get();
                }

                tickets.add(new TicketResponse(ticket, eventRepo.findById(ticket.getEventId()).get().getTitle(),feedback.getRating(), feedback.getFeedbackMsg()));
            }
        });
        return tickets;
    }

    public List<User> getStaff(Integer orgId){
        List<Organization> staff = new ArrayList<>();
        orgRepo.findAll().forEach(org -> {if(org.getOrganizerId()==orgId)staff.add(org);});

        List<User> users = new ArrayList<>();
        staff.forEach(org -> {users.add(userRepo.findById(org.getUserId()).get());});

        return users;
    }

    public List<Feedback> getEventFeedbacks(int eventId){
        List<Feedback> feedbacks = new ArrayList<>();
        feedbackRepo.findAll().forEach(feedback -> {
            if(feedback.getEventId()==eventId) feedbacks.add(feedback);
        });

        return feedbacks;
    }



}
