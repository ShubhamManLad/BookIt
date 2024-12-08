import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-staff-navbar',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './staff-navbar.component.html',
  styleUrl: './staff-navbar.component.css'
})
export class StaffNavbarComponent {
  username = localStorage.getItem("username");


  constructor( private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }

  gotoHome():void{
    this.router.navigate([`/staffHome`]);
  }
  gotoProfile():void{
    this.router.navigate([`/staffProfile`]);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
