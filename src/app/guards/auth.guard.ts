import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protects routes from unauthenticated access.
 * If no token exists, redirects to default root route '/'.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

/**
 * Prevents logged-in users from accessing the login page.
 * If token exists in localStorage, automatically redirects to /home.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
