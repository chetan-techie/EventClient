import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    if (token && this.isValidToken(token)) {
      // User is already authenticated, redirect to dashboard
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    // User is not authenticated, allow access to login
    return true;
  }

  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
