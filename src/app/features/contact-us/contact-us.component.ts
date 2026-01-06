import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../../core/services/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  formData: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  constructor(private contactService: ContactusService) {}

  postContact(): any {
    const payload = {
      name: this.formData.value.name as string,
      email: this.formData.value.email as string,
      message: this.formData.value.message as string,
    };

    this.contactService.sendMail(payload).subscribe({
      next: (response) => {
        console.log('Mail sent successfully', response);
        this.formData.reset();
      },
      error: (error) => {
        console.error('Error sending mail', error);
      },
    });
  }
}
