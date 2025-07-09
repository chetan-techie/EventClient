import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  requestOTP(email: string): Observable<any> {
    // request to update to send OTP via mail
    return this.http.get(`${baseUrl}/api/logins/GenOTP?email=${email}`);
  }

  login(otp: string): Observable<any> {
    return this.http.post(`${baseUrl}/api/logins/validate`, { otp: otp });
  }
}
