import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  constructor(private http: HttpClient) {}

  sendMail(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/contact/ `, payload);
  }
}
