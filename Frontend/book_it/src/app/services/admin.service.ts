import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookingResponse, Event, Ticket, EventRequest, Feedback, Notification } from '../models/event.model';
import { Organization, User } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly API_URL = 'http://localhost:8090';

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchOrgEvents(): Observable<Event[]> {
    const token = localStorage.getItem("token");
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Event[]>(`${this.API_URL}/getOrgEvents`, { headers });
  }

  addEvent(event: EventRequest):Observable<Event>{
    console.log(event);
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Event>(`${this.API_URL}/admin/addEvent`, event, { headers })
      .pipe(
        tap(response => {
          localStorage.setItem('eventId', ''+response.eventId);
        })
      );
  }

  fetchStaffEvents(): Observable<Event[]> {
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Event[]>(`${this.API_URL}/staff/getEvents`, { headers });
  }

  fetchEmployees(){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.API_URL}/admin/getStaff`, { headers });
  }

  removeEmployee(empId: string){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.delete<{}>(`${this.API_URL}/admin/removeStaff/${empId}`, { headers });
    
  }

  fetchOrganization(){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Organization>(`${this.API_URL}/getOrganizationName`, { headers });
  }

  createOrganization(organization: Organization){
    organization.organizerId = 0;
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(organization.username);

    return this.http.post<Organization>(`${this.API_URL}/admin/createOrganization`, organization,{ headers });
  }

  joinOrganization(organization: Organization){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    organization.organizerId = 0;
    console.log(organization.username);

    return this.http.post<Organization>(`${this.API_URL}/staff/joinOrganization`, organization,{ headers });
  }

  getStaffOrganization(){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Organization>(`${this.API_URL}/staff/getOrganization`, { headers });
  }

  getEventTickets(eventId: number){
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<BookingResponse[]>(`${this.API_URL}/getTickets/${eventId}`,{ headers });
  }
}
