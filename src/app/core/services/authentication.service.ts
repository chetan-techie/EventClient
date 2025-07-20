import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { baseUrl } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load token from storage on service initialization
    const token = localStorage.getItem('authToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  loginAdmin(loginData: any): Observable<any> {
    // request to update to send OTP via mail
    // return this.http.get(`${baseUrl}/api/logins/GenOTP?email=${email}`);
    return this.http.post(`${baseUrl}/auth/login`, {
      email: loginData.email,
      password: loginData.password,
    });
  }

  login(otp: string): Observable<any> {
    return this.http.post(`${baseUrl}/api/logins/validate`, { otp: otp });
  }
}
