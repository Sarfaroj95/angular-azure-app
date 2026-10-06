import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'sarfaroj_auth_token';

  readonly token = signal<string | null>(this.getStoredToken());
  readonly isAuthenticated = signal<boolean>(this.hasToken());

  constructor(private router: Router) {}

  /**
   * Generates a random alphanumeric token of specified length (default 20 characters)
   */
  private generateRandomToken(length = 20): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  hasToken(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      return !!token && token.trim().length === 20;
    }
    return false;
  }

  getToken(): string | null {
    return this.token();
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded check: admin / password
        if (username.trim() === 'admin' && password === 'password') {
          const generatedToken = this.generateRandomToken(20);
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, generatedToken);
          }
          this.token.set(generatedToken);
          this.isAuthenticated.set(true);
          resolve(true);
        } else {
          reject(new Error('Invalid username or password. Please use admin / password.'));
        }
      }, 900);
    });
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.token.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }
}
