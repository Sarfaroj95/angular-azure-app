import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly COOKIE_NAME = 'isDarkMode';

  /**
   * Signal indicating whether dark mode is currently active.
   * Initialized from the 'isDarkMode' cookie, defaulting to true.
   */
  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    this.applyDocumentTheme(this.isDarkMode());
  }

  /**
   * Reads initial dark mode preference from cookie.
   * If cookie is not present, sets and defaults to true.
   * If cookie is 'false', returns false.
   */
  private getInitialTheme(): boolean {
    if (typeof document === 'undefined') {
      return true;
    }
    const cookieVal = this.getCookie(this.COOKIE_NAME);
    if (cookieVal === null) {
      // Default is true when cookie is not set
      this.setCookie(this.COOKIE_NAME, 'true');
      return true;
    }
    return cookieVal !== 'false';
  }

  /**
   * Retrieves a cookie value by name from document.cookie.
   */
  getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      return null;
    }
    const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + escapedName + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  /**
   * Sets a cookie with specified expiration in days (default 365), path=/, and SameSite=Lax.
   */
  setCookie(name: string, value: string, days = 365): void {
    if (typeof document === 'undefined') {
      return;
    }
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
  }

  /**
   * Toggles the current theme between dark and light, updating the cookie.
   */
  toggleTheme(): void {
    const nextVal = !this.isDarkMode();
    this.setDarkMode(nextVal);
  }

  /**
   * Sets the theme explicitly to dark (true) or light (false) and updates the cookie.
   */
  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.setCookie(this.COOKIE_NAME, String(isDark));
    this.applyDocumentTheme(isDark);
  }

  /**
   * Applies the theme class to the document root element.
   */
  private applyDocumentTheme(isDark: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
}
