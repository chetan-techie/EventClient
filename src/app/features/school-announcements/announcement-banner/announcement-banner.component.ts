import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  Announcement,
  SchoolAnnouncementService,
} from '../../../core/services/school-announcement.service';

@Component({
  selector: 'app-announcement-banner',
  templateUrl: './announcement-banner.component.html',
  styleUrls: ['./announcement-banner.component.scss'],
})
export class AnnouncementBannerComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  currentIndex = 0;
  isVisible = true;
  autoRotateInterval: any;

  private destroy$ = new Subject<void>();
  private readonly AUTO_ROTATE_DELAY = 5000; // 5 seconds
  private readonly MAX_BANNER_ITEMS = 3; // Show only top 3

  constructor(
    private announcementService: SchoolAnnouncementService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
    this.checkIfDismissed();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAnnouncements(): void {
    this.announcementService
      .getActiveAnnouncements()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (announcements) => {
          // Get only pinned or top 3 announcements for banner
          this.announcements = announcements
            .filter(
              (a) =>
                a.pinned || announcements.indexOf(a) < this.MAX_BANNER_ITEMS,
            )
            .slice(0, this.MAX_BANNER_ITEMS);

          if (this.announcements.length > 1) {
            this.startAutoRotate();
          }
        },
        error: (err) => {
          console.error('Error loading announcements:', err);
        },
      });
  }

  checkIfDismissed(): void {
    const dismissed = localStorage.getItem('bannerDismissed');
    if (dismissed === 'true') {
      this.isVisible = false;
    }
  }

  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      this.next();
    }, this.AUTO_ROTATE_DELAY);
  }

  stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
  }

  previous(): void {
    this.currentIndex =
      this.currentIndex === 0
        ? this.announcements.length - 1
        : this.currentIndex - 1;
  }

  goToIndex(index: number): void {
    this.currentIndex = index;
    this.stopAutoRotate();
    this.startAutoRotate();
  }

  getCurrentAnnouncement(): Announcement | null {
    return this.announcements[this.currentIndex] || null;
  }

  dismiss(): void {
    this.isVisible = false;
    localStorage.setItem('bannerDismissed', 'true');

    // Auto-show again after 24 hours
    setTimeout(
      () => {
        localStorage.removeItem('bannerDismissed');
      },
      24 * 60 * 60 * 1000,
    );
  }

  viewAllAnnouncements(): void {
    this.router.navigate(['/announcements']);
  }

  getTruncatedContent(content: string, maxLength: number = 100): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  }
}
