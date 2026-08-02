import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from './core/services/events.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  underMaintenance: boolean = true;

  get isAdminPage(): boolean {
    return (
      localStorage.getItem('admin') === 'true' &&
      this.router.url.includes('admin')
    );
  }

  constructor(private router: Router, private eventsService: EventsService) {
    eventsService.incrementVisitCount().subscribe((count) => {
      console.log('Visit count:', count);
    });
  }

  isButtonVisible = false; // Variable to toggle button visibility

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show button when the user scrolls down 200px from the top
    this.isButtonVisible = window.pageYOffset > 300;
  }

  ngOnInit() {
    // this.router.navigate(['contact-us']);
  }

  title = 'bvbtest.client';

  onActivate(event: any): void {
    this.scrollToTop();
  }

  // Method to scroll to the top of the window
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
