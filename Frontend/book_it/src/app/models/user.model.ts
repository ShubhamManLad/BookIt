export interface User {
  name: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'STAFF';
  userRole: 'USER' | 'ADMIN' | 'STAFF';
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  name: string;
  userRole: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'STAFF';
  userRole: 'USER' | 'ADMIN' | 'STAFF';
}

export class Organization {
  organizerId:number =0;
  username:string = " "
}