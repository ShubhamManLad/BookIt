package com.example.book_it;
import com.example.book_it.model.EmailDetails;
import com.example.book_it.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BookItApplication {


	public static void main(String[] args) {
		SpringApplication.run(BookItApplication.class, args);




	}

}
//
//
//CREATE TABLE users(
//		user_id INT PRIMARY KEY IDENTITY(1,1),
//name NVARCHAR(50) NOT NULL,
//username NVARCHAR(100) NOT NULL UNIQUE,
//password NVARCHAR(255) NOT NULL,
//email NVARCHAR(255) NOT NULL,
//role NVARCHAR(20) NOT NULL CHECK (Role IN ('USER', 'ADMIN', 'STAFF')),
//		);
//
//CREATE TABLE events (
//		event_id INT PRIMARY KEY IDENTITY(1,1),
//title VARCHAR(100) NOT NULL,
//description TEXT,
//type TEXT NOT NULL,
//date DATE NOT NULL,
//location VARCHAR(100) NOT NULL,
//available_seats INT NOT NULL,
//total_seats INT NOT NULL,
//ticket_price DECIMAL(10, 2) NOT NULL
//);
//
//CREATE TABLE tickets (
//		ticket_id INT PRIMARY KEY IDENTITY(1,1),
//user_id INT NOT NULL,
//event_id INT NOT NULL,
//seat_number VARCHAR(10) NOT NULL,
//booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//payment_status TEXT,
//FOREIGN KEY (user_id) REFERENCES Users(user_id),
//FOREIGN KEY (event_id) REFERENCES Events(event_id)
//		);
//
//SELECT * FROM users;
//SELECT * FROM events;
//SELECT * FROM tickets;
//
//drop table users;
//drop table events;
//drop table tickets;
//
//INSERT INTO users (name, username, password, role)
//VALUES ('John Doe', 'john_doe', 'password123', 'USER');