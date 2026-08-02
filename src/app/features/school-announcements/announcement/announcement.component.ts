import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  SchoolAnnouncementService,
  Announcement,
} from '../../../core/services/school-announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  pinnedAnnouncements: Announcement[] = [];
  regularAnnouncements: Announcement[] = [];
  showAllAnnouncements = false;
  isLoading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();
  private readonly MAX_DISPLAY_COUNT = 3;

  constructor(private announcementService: SchoolAnnouncementService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAnnouncements(): void {
    this.isLoading = true;
    this.error = null;

    this.announcementService
      .getActiveAnnouncements()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (announcements) => {
          this.announcements = this.filterDismissedAnnouncements(announcements);
          this.categorizeAnnouncements();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading announcements:', err);
          this.error = 'Unable to load announcements. Please try again later.';
          this.isLoading = false;
        },
      });
  }

  /**
   * Filter out announcements that user has dismissed
   */
  private filterDismissedAnnouncements(
    announcements: Announcement[],
  ): Announcement[] {
    const dismissed = this.getDismissedAnnouncements();
    return announcements.filter((a) => !dismissed.includes(a.id));
  }

  /**
   * Separate pinned and regular announcements
   */
  categorizeAnnouncements(): void {
    this.pinnedAnnouncements = this.announcements.filter((a) => a.pinned);
    this.regularAnnouncements = this.announcements.filter((a) => !a.pinned);
  }

  /**
   * Get announcements to display based on show all state
   */
  getDisplayAnnouncements(): Announcement[] {
    if (this.showAllAnnouncements) {
      return this.announcements;
    }
    return this.announcements.slice(0, this.MAX_DISPLAY_COUNT);
  }

  /**
   * Toggle between showing all or limited announcements
   */
  toggleShowAll(): void {
    this.showAllAnnouncements = !this.showAllAnnouncements;
  }

  /**
   * Get human-readable time ago string
   */
  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  /**
   * Calculate days until announcement expires
   */
  getDaysUntilExpiry(date: Date): number {
    const now = new Date();
    const expiry = new Date(date);
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Check if announcement is expiring soon (within 7 days)
   */
  isExpiringSoon(date: Date): boolean {
    return this.getDaysUntilExpiry(date) <= 7;
  }

  /**
   * Dismiss/close an announcement
   */
  closeAnnouncement(id: string): void {
    // Add to dismissed list in localStorage
    const dismissed = this.getDismissedAnnouncements();
    dismissed.push(id);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissed));

    // Remove from current display
    this.announcements = this.announcements.filter((a) => a.id !== id);
    this.categorizeAnnouncements();

    // Optional: Mark as read in the service
    this.announcementService.markAsRead(id);
  }

  /**
   * Get list of dismissed announcements from localStorage
   */
  private getDismissedAnnouncements(): string[] {
    const stored = localStorage.getItem('dismissedAnnouncements');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Clear all dismissed announcements (useful for debugging)
   */
  clearDismissed(): void {
    localStorage.removeItem('dismissedAnnouncements');
    this.loadAnnouncements();
  }

  /**
   * Refresh announcements
   */
  refresh(): void {
    this.loadAnnouncements();
  }

  /**
   * Check if there are more announcements to show
   */
  hasMoreAnnouncements(): boolean {
    return this.announcements.length > this.MAX_DISPLAY_COUNT;
  }
}
