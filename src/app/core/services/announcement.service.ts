import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { baseUrl } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  baseurl: string = `${baseUrl}/api/announcements/`;
  constructor(private http: HttpClient) {}

  getAnnouncements(): any {
    // return of([{ announcement: 'announcement 1' }]);
    this.http.get(this.baseurl).subscribe((res) => console.log(res));
    return this.http.get(this.baseurl);
  }

  postAnnouncement(item: any): any {
    const url = item.id ? this.baseurl + item.id : this.baseurl;

    const payload = {
      announcement: item.announcement,
      dateTime: new Date(),
      status: item.status,
    };
    return item.id
      ? this.http.put(url, { id: item.id, ...payload })
      : this.http.post(url, payload);
  }

  deleteAnnouncement(id: any): any {
    return this.http
      .delete(this.baseurl + id)
      .subscribe((res) => confirm('Delete success'));
  }
}
