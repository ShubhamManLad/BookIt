import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username = localStorage.getItem("username");


  constructor( private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }

  gotoHome():void{
    this.router.navigate([`/home`]);
  }
  gotoBooking():void{
    this.router.navigate([`/tickets`]);
  }
  gotoProfile():void{
    this.router.navigate([`/profile`]);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
