import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/user/home/home.component';
import { EventBookingComponent } from './components/user/event-booking/event-booking.component';
import { TicketsComponent } from './components/user/tickets/tickets.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { EmployeeListComponent } from './components/admin/employee-list/employee-list.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { StaffHomeComponent } from './components/staff/staff-home/staff-home.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { GuestListComponent } from './components/staff/guest-list/guest-list.component';
import { EventDetailsComponent } from './components/admin/event-details/event-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent },
  { path: 'events', component: HomeComponent },
  { path: 'eventBooking/:id', component: EventBookingComponent},
  { path: 'tickets', component: TicketsComponent },
  { path: 'profile', component: ProfileComponent },
  
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'eventDetails/:id', component: EventDetailsComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'adminProfile', component: AdminProfileComponent },
  
  { path: 'staffHome', component: StaffHomeComponent },
  { path: 'staffProfile', component: StaffProfileComponent },
  { path: 'guestList/:id', component: GuestListComponent },
];