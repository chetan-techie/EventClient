import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  totalHits: number = 0;
  loading: boolean = true;
  animatedCount: number = 0;

  constructor(private router: Router, private eventService: EventsService) {}
  ngOnInit(): void {
    this.loadHitCount();
  }

  loadHitCount(): void {
    this.eventService.getVisitCount().subscribe({
      next: (count) => {
        this.totalHits = count;
        this.animateCounter(count);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading hit count:', err);
        this.loading = false;
      },
    });
  }

  animateCounter(target: number): void {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        this.animatedCount = target;
        clearInterval(timer);
      } else {
        this.animatedCount = Math.floor(current);
      }
    }, 16);
  }

  refreshHits(): void {
    this.loading = true;
    this.loadHitCount();
  }
}
