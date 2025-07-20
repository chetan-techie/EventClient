import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// Enhanced guard that handles both login and protected routes
@Injectable({
  providedIn: 'root',
})
export class AdminRouteGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = this.isValidToken(token);
    const isLoginRoute = childRoute.routeConfig?.path === 'login';

    // If trying to access login page while authenticated, redirect to dashboard
    if (isLoginRoute && isAuthenticated) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    // If trying to access protected routes without authentication, redirect to login
    if (!isLoginRoute && !isAuthenticated) {
      this.router.navigate(['/admin/login']);
      return false;
    }

    return true;
  }

  private isValidToken(token: string | null): boolean {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
