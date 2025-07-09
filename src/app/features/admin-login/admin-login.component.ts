import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  formData = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });
  enableOTPField: boolean = false;
  loginWait: boolean = false;

  get email() {
    return this.formData.get('email');
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  dialOTP(): void {
    const email = this.formData.value.email;
    const password = this.formData.value.password;
    this.loginWait = !this.loginWait;
    if (!password && email) {
      this.authenticationService.requestOTP(email).subscribe((res) => {
        if (res) {
          this.enableOTPField = true;
          this.loginWait = false;
        }
      });
    } else if (password) {
      this.authenticationService.login(password).subscribe((res) => {
        if (res) {
          this.loginWait = false;
          localStorage.setItem('admin', 'true');
          this.router.navigate(['admin/announcements']);
        }
      });
    }
  }
}
