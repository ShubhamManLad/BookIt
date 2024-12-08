import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingResponse } from '../../../models/event.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.css'
})
export class GuestListComponent {

  eventId : any = "";
  errorMessage: string = '';
  event : any = null;
  tickets: BookingResponse[] = [];

  constructor(private eventService: EventService, private adminService: AdminService, private router: Router, private route: ActivatedRoute) {}

  searchQuery: string = '';

  searchName() {
    this.tickets = this.tickets.filter(ticket =>
      ticket.bookingName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId += params.get('id'); 
      this.getEventDetails(this.eventId);
    });
    this.getEventTickets(this.eventId);
  }

  
  gotoHome(): void{
    this.router.navigate([`/staffHome`]);
  }

  
  getEventDetails(eventId: number): void {
    this.eventService.fetchEvent(eventId).subscribe({
      next: (data) => (this.event = data),
      error: (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
      },
    });
  }

  getEventTickets(eventId: number): void{
    this.adminService.getEventTickets(eventId).subscribe({
      next: (data) => (this.tickets = data),
      error: (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
      },
    });
    console.log(this.tickets);
  }


}
