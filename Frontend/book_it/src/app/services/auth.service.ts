import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginCredentials, SignupCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8090';
  private authTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signIn`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('name', response.name);
          localStorage.setItem('userRole', response.userRole);
        })
      );
  }

  signup(credentials: SignupCredentials): Observable<AuthResponse> {
    credentials.role = credentials.userRole;
    return this.http.post<AuthResponse>(`${this.API_URL}/signUp`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('name', response.name);
          localStorage.setItem('userRole', response.userRole);
          this.authTokenSubject.next(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('userRole');
    this.authTokenSubject.next(null);
  }

  getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

}