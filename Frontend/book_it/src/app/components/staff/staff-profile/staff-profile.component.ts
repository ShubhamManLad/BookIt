import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Organization } from '../../../models/user.model';
import { StaffNavbarComponent } from '../../shared/staff-navbar/staff-navbar.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-staff-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, StaffNavbarComponent],
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.css'
})
export class StaffProfileComponent {

  signupForm: FormGroup;
  
  email = localStorage.getItem("email");
  name = localStorage.getItem("name");
  username = localStorage.getItem("username");

  organization: Organization = new Organization();

  isEmployee: boolean = false;
  isModalOpen: boolean = false;

  constructor( private fb: FormBuilder, private adminService: AdminService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  ngOnInit(): void{
    this.getStaffOrganization();
  }

  openOrgModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  joinOrganization():void{
    this.adminService.joinOrganization(this.organization).subscribe({
      next: (data) => (this.organization = data),
      error:(error) =>{

      }
    });
    this.closeModal();
  }

  getStaffOrganization(): void{
    this.adminService.getStaffOrganization().subscribe({
      next: (data) => {
        this.organization = data;
        this.isEmployee = true;
      },
      error: (error) => {
        
      },
    });
  }

}
