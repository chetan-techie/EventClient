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
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Message: new FormControl('', Validators.required),
  });

  constructor(private contactService: ContactusService) {}

  postContact(): any {
    const payload = {
      Name: this.formData.value.Name as string,
      Email: this.formData.value.Email as string,
      Message: this.formData.value.Message as string,
    };

    this.contactService.sendMail(payload).subscribe({
      next: (response) => {
        console.log('Mail sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending mail', error);
      },
    });
  }
}
