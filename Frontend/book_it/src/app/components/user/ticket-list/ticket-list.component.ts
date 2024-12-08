import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { BookingResponse, Feedback } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [ FormsModule ,CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  
  tickets: BookingResponse[] = [];
  feedback: Feedback = new Feedback();
  stars: number[] = Array(5).fill(0); 
  selectedEventName: string = '';

  paymentLoading = false;
  cancelationLoading = false;

  errorMessage: string = '';
  isModalOpen: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  openFeedbackModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  setRating(star: number) {
    this.feedback.rating = star; 
  }

  loadTickets(): void {
    this.eventService.fetchTickets().subscribe({
      next: (data) => (this.tickets = data),
      error: (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
      },
    });
  }

  payTicket(ticketId:number): void{
    this.paymentLoading = true;
    this.eventService.payTicket(ticketId).subscribe({
      next: (data) => {
        console.log(data);
        alert('Seat confirmed!');
        this.loadTickets();
        this.paymentLoading = false;
      },
      error: (error) => {
        console.error('Error in payment:', error);
        this.errorMessage = 'Unable to pay. Please try again later.';
        alert('Payment Failed! Check if tickets are available.');
        this.loadTickets();
        this.paymentLoading = false;
      },
    });
  }

  cancelTicket(ticketId:number): void{
    this.cancelationLoading = true;
    this.eventService.cancelTicket(ticketId).subscribe({
      next: (data) => {
        console.log(data);
        alert('Booking Cancelled!');
        this.loadTickets();
        this.cancelationLoading = false;
      },
      error: (error) => {
        console.error('Error in cancellation:', error);
        alert('Error in cancellation!');
        this.errorMessage = 'Unable to cancel ticket. Please try again later.';
        this.loadTickets();
        this.cancelationLoading = false;
      },
    });
    this.loadTickets();
  }

  selectTicket(ticketId: number, eventName: string){
    this.feedback.ticketId=ticketId;
    this.selectedEventName=eventName;
    this.openFeedbackModal();

  }

  sendFeedback():void{
    this.eventService.sendFeedback(this.feedback).subscribe({
      next: (data)=>{
        alert("Feedback Sent!");
      },
      error: (error)=>{
        console.log(error);
        alert("Error Sending Feedback!");
      }
    });
    this.closeModal();
  }

}
