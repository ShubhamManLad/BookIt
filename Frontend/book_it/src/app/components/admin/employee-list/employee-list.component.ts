import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../shared/admin-navbar/admin-navbar.component';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: User[] = [];

  searchMode: boolean = false;
  searchQuery: string = ''; 

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.adminService.fetchEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (error) => {
        alert('Error fetching employees');
      },
    });
  }

  toggleSearch() {
    this.searchMode = !this.searchMode;
    if (!this.searchMode) {
      this.searchQuery = ''; 
      this.loadEmployees();
    }
  }

  searchEvents() {
    this.employees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  removeEmployee(empId: string){
    this.adminService.removeEmployee(empId).subscribe({
      next: (data) => {},
      error: (error) => {
        alert('Error removing employees:');
      },
    });
  }

}
