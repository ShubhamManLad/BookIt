import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          if(data.userRole == 'ADMIN' ) this.router.navigate(['/adminHome']);
          else if(data.userRole == 'STAFF') this.router.navigate(['/staffHome'])
          else this.router.navigate(['/home']);
          
        },
        error: (error) => {
          alert('Login failed. Try again!');
          console.error('Login failed:', error);
          this.isLoading = false;
        }
      });
    }
  }
}