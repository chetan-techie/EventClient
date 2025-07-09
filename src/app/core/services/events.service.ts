import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): any {
    return this.http.get(`${baseUrl}/api/school-events`);
  }

  postEvent(item: any): any {
    return this.http.post(`${baseUrl}/api/school-events`, item);
  }

  deleteEvent(id: any): any {
    return this.http.delete(`${baseUrl}/api/school-events/${id}`);
  }
}
