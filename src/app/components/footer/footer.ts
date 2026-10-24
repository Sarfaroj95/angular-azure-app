import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private themeService = inject(ThemeService);

  isDarkMode = input<boolean>(this.themeService.isDarkMode());
}
