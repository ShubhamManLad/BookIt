import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { EventListComponent } from "../../shared/event-list/event-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  events: Event[] = [];
  errorMessage: string = '';

  constructor(private eventService: EventService, private router: Router) {}

}
