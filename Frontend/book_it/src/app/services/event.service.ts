import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookingResponse, Event, Ticket, Feedback, Notification } from '../models/event.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = 'http://localhost:8090';  
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchAllEvents(): Observable<Event[]> {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Event[]>(`${this.API_URL}/getEvents`, { headers });
  }

  fetchTypeEvents(type: string){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Event[]>(`${this.API_URL}/getEvents/${type}`, { headers });
  }

  fetchEvent(eventId:number){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Event>(`${this.API_URL}/getEvent/${eventId}`, { headers });
  }

  bookEvent(ticket: Ticket){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log("booking.....");
    return this.http.post<BookingResponse>(`${this.API_URL}/bookTicket`, ticket, { headers })
      .pipe(
        tap(response => {
          localStorage.setItem('ticketId', ''+response.ticketId);
        })
      );
  }

  // Ticket functions
  fetchTickets(): Observable<BookingResponse[]>{
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<BookingResponse[]>(`${this.API_URL}/getTickets`, { headers });
  }

  payTicket(ticketId: number): Observable<BookingResponse>{
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<BookingResponse>(`${this.API_URL}/payTicket/${ticketId}`, {},{ headers });
  }

  cancelTicket(ticketId: number){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<BookingResponse[]>(`${this.API_URL}/cancelTicket/${ticketId}`, {},{ headers });
  }

  sendFeedback(feedback: Feedback){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Feedback>(`${this.API_URL}/sendFeedback`, feedback,{ headers });
  }

  addNotification(notification: Notification){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Notification>(`${this.API_URL}/addNotification`, notification,{ headers });
  }

}
