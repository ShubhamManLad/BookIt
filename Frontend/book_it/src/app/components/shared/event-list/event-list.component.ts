import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EventListComponent implements OnInit {

  events: Event[] = [];
  tabs: string[] = ['All', 'Movie', 'Conference', 'Sports', 'Concert'];
  selectedTab = 'All';
  errorMessage: string = '';

  userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  role = this.userRole.value;
  
  locations = ['Mumbai', 'Chennai', 'Vellore', 'Hyderabad'];
  selectedType: string = 'All';
  selectedLocation: string = '';
  showLocationDropdown: boolean = false;

  searchMode: boolean = false; 
  searchQuery: string = ''; 

  constructor(private eventService: EventService, private adminService: AdminService ,private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
    this.loadEvents();
  }

  loadEvents(): void {
    this.selectedLocation='';
    if (this.userRole.value == "USER") {
      this.eventService.fetchAllEvents().subscribe({
        next: (data) => (this.events = data),
        error: (error) => {
          console.error('Error fetching events:', error);
          this.errorMessage = 'Unable to fetch events. Please try again later.';
        },
      });
    }
    else if (this.userRole.value == "STAFF") {
      this.adminService.fetchStaffEvents().subscribe({
        next: (data) => (this.events = data),
        error: (error) => {
          console.error('Error fetching events:', error);
          this.errorMessage = 'Unable to fetch events. Please try again later.';
        },
      });
    }
    else{
      this.adminService.fetchOrgEvents().subscribe({
        next: (data) => (this.events = data),
        error: (error) => {
          console.error('Error fetching events:', error);
          this.errorMessage = 'Unable to fetch events. Please try again later.';
        },
      });
    }
  }

  filterEvents(tab: string): void {
    this.selectedTab = tab;
    if (tab == "All") {
      this.loadEvents();
    }
    else {
      this.eventService.fetchTypeEvents(tab).subscribe({
        next: (data) => {
          this.events = data
        },
        error: (error) => {
          console.error('Error fetching events:', error);
          this.errorMessage = 'Unable to fetch events. Please try again later.';
        },
      });
    }
  }

  toggleLocationDropdown() {
    this.showLocationDropdown = !this.showLocationDropdown;
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.showLocationDropdown = false; // Close dropdown after selection
    this.events = this.events.filter((event,index)=>event.location==this.selectedLocation);
  }

  toggleSearch() {
    this.searchMode = !this.searchMode;
    if (!this.searchMode) {
      this.searchQuery = ''; 
      this.loadEvents();
    }
  }

  searchEvents() {
    this.events = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  gotoEvent(eventId: any): void {
    this.router.navigate([`/eventBooking`, eventId]);
  }

  gotoEventEdit(eventId: any): void {
    this.router.navigate([`/eventDetails`, eventId]);
  }

  gotoEventTickets(eventId: any): void{
    this.router.navigate([`/guestList`, eventId]);
  }

  

}
