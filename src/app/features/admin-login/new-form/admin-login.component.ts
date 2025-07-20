import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authMode: 'password' | 'otp' = 'password';
  isLoading = false;
  showPassword = false;
  otpSent = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', [Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit(): void {
    this.updateValidators();
  }

  switchAuthMode(mode: 'password' | 'otp'): void {
    this.authMode = mode;
    this.errorMessage = '';
    this.successMessage = '';
    this.otpSent = false;
    this.updateValidators();
  }

  updateValidators(): void {
    const passwordControl = this.loginForm.get('password');
    const otpControl = this.loginForm.get('otp');

    if (this.authMode === 'password') {
      passwordControl?.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
      otpControl?.clearValidators();
    } else {
      passwordControl?.clearValidators();
      otpControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]);
    }

    passwordControl?.updateValueAndValidity();
    otpControl?.updateValueAndValidity();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async sendOTP(): Promise<void> {
    if (this.loginForm.get('email')?.invalid) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.http
        .post<any>('/api/auth/send-otp', {
          email: this.loginForm.get('email')?.value,
        })
        .toPromise();

      this.otpSent = true;
      this.successMessage = 'OTP sent successfully to your email';
      this.isLoading = false;
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Failed to send OTP';
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loginData = {
      email: this.loginForm.get('email')?.value,
      ...(this.authMode === 'password'
        ? { password: this.loginForm.get('password')?.value }
        : { otp: this.loginForm.get('otp')?.value }),
    };

    this.authenticationService.loginAdmin(loginData).subscribe({
      next: (response) => {
        // Handle successful login
        this.successMessage = 'Login successful!';

        // Store token if needed (though AuthenticationService might handle this)
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }

        // Redirect to dashboard
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1000);

        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || error.message || 'Login failed';
        this.isLoading = false;
      },
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength'])
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid 6-digit OTP';
    }
    return '';
  }
}
