import { Component } from '@angular/core';
import { EventListComponent } from '../../shared/event-list/event-list.component';
import { StaffNavbarComponent } from '../../shared/staff-navbar/staff-navbar.component';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [StaffNavbarComponent, EventListComponent],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css'
})
export class StaffHomeComponent {

}
