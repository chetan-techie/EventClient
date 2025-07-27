import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventsService, SchoolEvent } from '../../core/services/events.service';

@Component({
  selector: 'app-events-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events-video.component.html',
  styleUrls: ['./events-video.component.css'],
})
export class EventsVideoComponent implements OnInit, OnDestroy {
  events: SchoolEvent[] = [];
  loading = true;
  activeVideoId: string | null = null;
  private embedUrls = new Map<string, SafeResourceUrl>();
  private thumbnailUrls = new Map<string, string>();

  constructor(
    private sanitizer: DomSanitizer,
    private es: EventsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    // Clean up any resources if needed
    this.embedUrls.clear();
    this.thumbnailUrls.clear();
  }

  loadEvents() {
    this.es.getEvents().subscribe((events: any) => {
      this.loading = false;
      this.events = events
        .filter((e: any) => e.eventType === 'video' && e.active)
        .sort(
          (a: any, b: any) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        );

      // Pre-generate URLs to avoid re-computation
      this.preGenerateUrls();
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  private preGenerateUrls() {
    this.events.forEach((event) => {
      const videoId = this.extractYouTubeVideoId(event.eventURL);
      if (videoId) {
        // Cache thumbnail URL
        this.thumbnailUrls.set(
          event.id,
          `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        );

        // Cache embed URL
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
        this.embedUrls.set(
          event.id,
          this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
        );
      }
    });
  }

  trackByEventId(index: number, event: SchoolEvent): string {
    return event.id;
  }

  getYoutubeThumbnail(eventId: string): string {
    return this.thumbnailUrls.get(eventId) || '';
  }

  getEmbedUrl(eventId: string): SafeResourceUrl {
    return this.embedUrls.get(eventId) || '';
  }

  private extractYouTubeVideoId(url: string): string {
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    console.warn('Could not extract YouTube video ID from URL:', url);
    return '';
  }

  toggleVideo(eventId: string) {
    const wasActive = this.activeVideoId === eventId;
    this.activeVideoId = wasActive ? null : eventId;
    this.cdr.markForCheck();
  }

  closeVideo() {
    this.activeVideoId = null;
    this.cdr.markForCheck();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getActiveEventsCount(): number {
    return this.events.filter((event) => event.active).length;
  }

  getVideoDuration(url: string): string {
    // In a real app, you would fetch this from YouTube API
    // For now, we'll show a loading state or hide duration
    return '...';
  }

  shareEvent(event: SchoolEvent) {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out this amazing event: ${event.name}`,
        url: event.eventURL,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(event.eventURL).then(() => {
        alert('Event link copied to clipboard!');
      });
    }
  }
}
