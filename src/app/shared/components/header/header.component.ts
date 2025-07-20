import { Component, Input, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  isAdmin: boolean = false;
  isMenuCollapsed: boolean = true;
  private routerSubscription: Subscription = new Subscription();

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    // Check current route on component initialization
    this.checkAdminRoute();

    // Subscribe to router events to detect route changes
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkAdminRoute();
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    this.routerSubscription.unsubscribe();
  }

  private checkAdminRoute(): void {
    // Check if current route starts with '/admin' but exclude login route
    const currentUrl = this.router.url;
    this.isAdmin =
      currentUrl.startsWith('/admin') && !currentUrl.includes('/admin/login');
  }

  triggerTimeout(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          // Your code here
        });
      }, 3000);
    });
  }

  logout(): void {
    // Clear any stored authentication tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');

    // Reset admin state
    this.isAdmin = false;

    // Navigate to login page or home page
    this.router.navigate(['admin/login']);

    // Optional: Show logout confirmation
    console.log('User logged out successfully');
  }
}
