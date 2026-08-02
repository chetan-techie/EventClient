import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AnnouncementDTO {
  id: string;
  title: string;
  content: string;
  visible: boolean;
  publishedAt: string; // ISO date string from API
  expiresAt: string; // ISO date string from API
  pinned: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  visible: boolean;
  publishedAt: Date;
  expiresAt: Date;
  pinned: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolAnnouncementService {
  private apiUrl = 'http://localhost:8085/api/announcement'; // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Get all active announcements
   * Only returns visible announcements that haven't expired
   */
  getActiveAnnouncements(): Observable<Announcement[]> {
    const params = new HttpParams()
      .set('visible', 'true')
      .set('active', 'true'); // Assumes backend filters by expiry date

    return this.http.get<AnnouncementDTO[]>(this.apiUrl).pipe(
      map((dtos) => this.mapDTOsToAnnouncements(dtos)),
      map((announcements) => this.filterActiveAnnouncements(announcements)),
      map((announcements) => this.sortAnnouncements(announcements)),
    );
  }

  /**
   * Get a single announcement by ID
   */
  getAnnouncementById(id: string): Observable<Announcement> {
    return this.http
      .get<AnnouncementDTO>(`${this.apiUrl}/${id}`)
      .pipe(map((dto) => this.mapDTOToAnnouncement(dto)));
  }

  /**
   * Get pinned announcements only
   */
  getPinnedAnnouncements(): Observable<Announcement[]> {
    return this.getActiveAnnouncements().pipe(
      map((announcements) => announcements.filter((a) => a.pinned)),
    );
  }

  /**
   * Map DTO array to Announcement array
   */
  private mapDTOsToAnnouncements(dtos: AnnouncementDTO[]): Announcement[] {
    return dtos.map((dto) => this.mapDTOToAnnouncement(dto));
  }

  /**
   * Map single DTO to Announcement
   */
  private mapDTOToAnnouncement(dto: AnnouncementDTO): Announcement {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      visible: dto.visible,
      publishedAt: new Date(dto.publishedAt),
      expiresAt: new Date(dto.expiresAt),
      pinned: dto.pinned,
    };
  }

  /**
   * Filter announcements to only show active ones
   */
  private filterActiveAnnouncements(
    announcements: Announcement[],
  ): Announcement[] {
    const now = new Date();
    return announcements.filter(
      (announcement) => announcement.visible && announcement.expiresAt > now,
    );
  }

  /**
   * Sort announcements: pinned first, then by published date (newest first)
   */
  private sortAnnouncements(announcements: Announcement[]): Announcement[] {
    return announcements.sort((a, b) => {
      // Pinned announcements come first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // Within same pinned status, sort by published date (newest first)
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  }

  /**
   * Mark announcement as read (optional feature)
   */
  markAsRead(id: string): void {
    const readAnnouncements = this.getReadAnnouncements();
    if (!readAnnouncements.includes(id)) {
      readAnnouncements.push(id);
      localStorage.setItem(
        'readAnnouncements',
        JSON.stringify(readAnnouncements),
      );
    }
  }

  /**
   * Check if announcement has been read
   */
  isRead(id: string): boolean {
    const readAnnouncements = this.getReadAnnouncements();
    return readAnnouncements.includes(id);
  }

  /**
   * Get list of read announcements from localStorage
   */
  private getReadAnnouncements(): string[] {
    const stored = localStorage.getItem('readAnnouncements');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Clear read announcements (useful for testing)
   */
  clearReadAnnouncements(): void {
    localStorage.removeItem('readAnnouncements');
  }
}
