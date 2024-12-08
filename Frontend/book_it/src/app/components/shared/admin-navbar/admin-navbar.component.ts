import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  username = localStorage.getItem("username");


  constructor( private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }

  gotoHome():void{
    this.router.navigate([`/adminHome`]);
  }
  gotoEmployees():void{
    this.router.navigate([`/employees`]);
  }
  gotoProfile():void{
    this.router.navigate([`/adminProfile`]);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
