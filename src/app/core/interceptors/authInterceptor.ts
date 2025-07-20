import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Interceptor called for:', request.method, request.url);

    // CRITICAL: Skip OPTIONS requests entirely
    if (request.method === 'OPTIONS') {
      console.log('Skipping OPTIONS request');
      return next.handle(request);
    }

    const isCUDOperation = this.isCUDOperation(request.method);
    console.log('Is CUD operation:', isCUDOperation);

    if (isCUDOperation) {
      const token = this.getAuthToken();
      console.log('Token present:', !!token);

      if (token) {
        console.log('Adding Authorization header');
        const authRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });

        console.log('Final request headers:', authRequest.headers.keys());

        return next.handle(authRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Request failed:', error);
            if (error.status === 401) {
              console.error('Unauthorized access - token might be expired');
            }
            return throwError(() => error);
          })
        );
      }
    }

    console.log('Proceeding without modification');
    return next.handle(request);
  }

  private isCUDOperation(method: string): boolean {
    return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
  }

  private getAuthToken(): string | null {
    // Option 1: Get from localStorage
    return localStorage.getItem('authToken');

    // Option 2: Get from sessionStorage
    // return sessionStorage.getItem('authToken');

    // Option 3: Inject your AuthService and get token from there
    // return this.authService.getToken();
  }
}
