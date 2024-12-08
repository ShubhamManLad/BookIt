import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Ticket, Notification } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.css'
})
export class EventBookingComponent implements OnInit {
  eventId : any = "";
  errorMessage: string = '';
  event : any = null;

  notification: Notification = new Notification();
  
  bookingName: string = '';
  selectedSeat: string = '';
  numPpl: number = 0;
  isModalOpen: boolean = false;

  seats: string[][] = [];
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  rows = 10; 
  cols = 10; 


  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId += params.get('id'); 
      this.getEventDetails(this.eventId);
    });
    this.generateSeats();
    const emailId = localStorage.getItem("email")+"";
    this.notification.email = emailId;
    this.notification.eventId = this.eventId;
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

  openBookingModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
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

  confirmBooking() : void{
    console.log("Booking..")

    const ticket: Ticket = {
      bookingName: this.bookingName,
      eventId: this.eventId,
      seatNumber: this.selectedSeat,
      numPpl: this.numPpl,
      bookingDate: new Date(),
      paymentStatus: 'PENDING',
      ticketPrice: 0,
    };

    console.log(ticket);

    this.eventService.bookEvent(ticket).subscribe({
      next: () => {
        this.closeModal();
        alert('Complete the payment to confirm your seat!')
        this.router.navigate([`/tickets`]);
      },
      error: (error) => {
        console.error('Booking failed:', error);
        alert('Unable to book ticket. Event seats full!')
      }
    });
  }

  notify(): void{
    this.eventService.addNotification(this.notification).subscribe({
      next: () => {
        this.closeModal();
        alert('You will be notified if additional seats are available!')
        this.router.navigate([`/home`]);
      },
      error: (error) => {
        console.error('Failed:', error);
        alert('Failed');
      }
    });
  }

  gotoHome(): void{
    this.router.navigate([`/home`]);
  }

}
