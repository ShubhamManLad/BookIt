import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event, EventRequest } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { EventListComponent } from "../../shared/event-list/event-list.component";
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from "../../shared/admin-navbar/admin-navbar.component";
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, EventListComponent, FormsModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})

export class AdminHomeComponent {

  events: Event[] = [];
  event: EventRequest = new EventRequest();
  eventTypes: string[] = ['Concert', 'Movie', 'Conference', 'Sports'];
  date: string = '';
  time: string = '';
  
  errorMessage: string = '';

  isModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  openEventModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addEvent(): void {
    this.event.availableSeats = this.event.totalSeats;
    this.event.date = `${this.date}T${this.time}`;
    console.log(this.event);
    this.adminService.addEvent(this.event).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Event creation failed:', error);
      }
    });

  }

}
