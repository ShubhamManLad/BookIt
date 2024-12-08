import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { BookingResponse } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  eventId : any = "";
  errorMessage: string = '';
  event : any = null;
  
  bookingName: string = '';
  selectedSeat: string = '';
  numPpl: number = 0;
  seatSections: string[] = ['VIP', 'Standard', 'Economy']; // Predefined seat sections
  isModalOpen: boolean = false;

  seats: string[][] = [];
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  tickets: BookingResponse[] = [];
  rows = 10; 
  cols = 10; 
  avgRating = 0;
  feedbacks = 0;


  constructor(private eventService: EventService,private adminService: AdminService, private router: Router, private route: ActivatedRoute) {
    
  }

  generateSeats(): void {
    for (let i = 1; i <= this.rows; i++) {
      const row = [];
      for (let j = 1; j <= this.cols; j++) {
        const seatLabel = `${i}${String.fromCharCode(64 + j)}`;
        row.push(seatLabel);
      }
      this.seats.push(row);
    }
  }

  toggleSeatSelection(seat: string): void {
    if (this.bookedSeats.includes(seat)) return;

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
      this.numPpl--;
    } else {
      this.selectedSeats.push(seat);
      this.numPpl++;
    }
    this.selectedSeat =  this.selectedSeats.join(',');
  }

  openEditModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId += params.get('id'); 
      this.getEventDetails(this.eventId); 
      this.getEventTickets(this.eventId);
    });
    this.generateSeats();
  }

  getEventDetails(eventId: number): void {
    this.eventService.fetchEvent(eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.bookedSeats = this.event.selectedSeats.split(",");
        this.rows = this.event.totalSeats/10;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
      },
    });
  }

  getEventTickets(eventId: number): void{
    this.adminService.getEventTickets(eventId).subscribe({
      next: (data) => {
        this.tickets = data;
        this.tickets.forEach(ticket => {
          if(ticket.rating!=0){
            this.feedbacks++;
            this.avgRating= (this.avgRating+ticket.rating)/this.feedbacks;
          }
        });
      
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
      },
    });
    console.log(this.tickets);
  }

  editEvent(): void{}

  gotoHome(): void{
    this.router.navigate([`/adminHome`]);
  }
}
