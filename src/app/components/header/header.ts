import { Component, inject, input, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);

  isDarkMode = input<boolean>(true);
  themeToggle = output<void>();

  onToggleTheme(): void {
    this.themeToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
