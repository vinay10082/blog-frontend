import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: '../login/login.css'
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  error = '';
  loading = false;
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.error = '';
    this.authService.register(this.user).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
