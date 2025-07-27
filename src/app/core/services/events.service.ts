import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../shared/utils/utils';

export interface SchoolEvent {
  id: string;
  name: string;
  eventDate: string;
  eventType: 'image' | 'video';
  eventURL: string;
  active: boolean;
  createdDate?: string;
  modifiedDate?: string;
  imagePath?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = `${baseUrl}/api/school-events`;
  private eventVideoApiUrl = `${baseUrl}/api/school-events-video`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<SchoolEvent[]> {
    return this.http.get<SchoolEvent[]>(this.apiUrl);
  }

  getEvent(id: string): Observable<SchoolEvent> {
    return this.http.get<SchoolEvent>(`${this.apiUrl}/${id}`);
  }

  // For creating/updating events with FormData (file uploads) or SchoolEvent objects
  createEvent(eventData: FormData | SchoolEvent): Observable<SchoolEvent> {
    if (
      (eventData as any).eventType === 'video' &&
      typeof eventData === 'object'
    ) {
      return this.http.post<SchoolEvent>(this.eventVideoApiUrl, eventData);
    }
    return this.http.post<SchoolEvent>(this.apiUrl, eventData);
  }

  updateEvent(
    id: string,
    eventData: FormData | SchoolEvent
  ): Observable<SchoolEvent> {
    return this.http.put<SchoolEvent>(`${this.apiUrl}/${id}`, eventData);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Legacy methods for backward compatibility
  postEvent(item: any): Observable<any> {
    return this.createEvent(item);
  }
}
