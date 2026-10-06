import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal<string>('admin');
  password = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal<boolean>(false);
  isDarkMode = signal<boolean>(true);

  ngOnInit(): void {
    // If token already exists in localStorage, automatically route to home
    if (this.authService.hasToken()) {
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  toggleTheme(): void {
    this.isDarkMode.update((val) => !val);
  }

  async onSubmit(): Promise<void> {
    if (!this.username().trim() || !this.password()) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.login(this.username(), this.password());
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid username or password.');
    } finally {
      this.isLoading.set(false);
    }
  }

  fillDemoCredentials(): void {
    this.username.set('admin');
    this.password.set('password');
    this.errorMessage.set(null);
  }
}
