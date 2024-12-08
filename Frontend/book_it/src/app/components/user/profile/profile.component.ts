import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  signupForm: FormGroup;
  email = localStorage.getItem("email");
  name = localStorage.getItem("name");
  username = localStorage.getItem("username");

  constructor(
    private fb: FormBuilder,
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
      userRole: ['USER', Validators.required]
    });
  }

}
