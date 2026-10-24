import { Component, inject, input, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  isDarkMode = input<boolean>(this.themeService.isDarkMode());
  themeToggle = output<void>();

  onToggleTheme(): void {
    this.themeToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
