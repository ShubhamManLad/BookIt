import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { Organization } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { AdminNavbarComponent } from "../../shared/admin-navbar/admin-navbar.component";
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  signupForm: FormGroup;
  organization: Organization = new Organization();

  isOrganizer: boolean = false;
  isModalOpen: boolean = false;

  email = localStorage.getItem("email");
  name = localStorage.getItem("name");
  username = localStorage.getItem("username");

  constructor( private fb: FormBuilder, private adminService: AdminService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  ngOnInit(): void{
    const userRole = localStorage.getItem("userRole");
    console.log(userRole);
    this.getOrganization();
  }

  openOrgModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createOrganization():void{
    this.adminService.createOrganization(this.organization).subscribe({
      next: (data) => (this.organization = data),
      error:(error) =>{

      }
    });
    this.closeModal();
  }

  getOrganization(): void{
    this.adminService.fetchOrganization().subscribe({
      next: (data) => {
        this.organization = data;
        this.isOrganizer = true;
      },
      error: (error) => {
        this.isOrganizer = false;
      },
    });
  
  }




}
