package com.example.book_it.service;

import com.example.book_it.model.Notification;
import com.example.book_it.repository.NotificationRepo;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    NotificationRepo notificationRepo;

    public List<Notification> getNotifications(int eventId){
        List<Notification> notifications = new ArrayList<>();
        notificationRepo.findAll().forEach(notification -> {
            if(notification.getEventId()==eventId){
                notifications.add(notification);
            }
        });
        return notifications;
    }

    public Notification addNotification(Notification notification){
        return notificationRepo.save(notification);
    }


}
