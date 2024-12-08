import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TicketListComponent } from '../ticket-list/ticket-list.component';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ NavbarComponent, TicketListComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

}
