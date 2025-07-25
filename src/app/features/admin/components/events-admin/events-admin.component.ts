import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../../core/services/events.service';
import { baseImageUrl } from '../../../../shared/utils/utils';

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css'],
})
export class EventsAdminComponent implements OnInit {
  events: any[] = [];
  eventsForm: FormGroup;
  selectedFile: File | null = null;
  imageData: string = 'null';
  selectedEvent: any = null;
  addEditForm: boolean = false;

  constructor(private fb: FormBuilder, private es: EventsService) {
    this.eventsForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventType: ['image'],
      eventURL: [''],
      active: [false, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.es.getEvents().subscribe((events: any) => {
      this.events = events
        .map((event: any) => ({
          ...event,
          imagePath: `${baseImageUrl}/${event.imagePath}`,
        }))
        .filter((e: any) => e.eventType === 'image');
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];

      const reader = new FileReader();
      let base64String = null;
      reader.onload = (e: any) => {
        this.imageData = e.target.result.split(',')[1];
        console.log('Base64 String:', base64String); // You can use this Base64 string as needed
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  editEvent(event: any) {
    this.addEditForm = true;
    this.selectedEvent = { ...event, eventType: 'image' };

    this.eventsForm.patchValue({
      id: event.id,
      name: event.name,
      eventURL: event.eventURL,
      eventDate: event.eventDate,
      active: event.active,
    });

    this.eventsForm.get('active')?.markAsTouched();
    this.eventsForm.get('active')?.markAsDirty();
  }

  removeEvent(eventId: number) {
    this.es.deleteEvent(eventId.toString()).subscribe((res: any) => {
      this.events = this.events.filter((event) => event.id !== res.id);
      this.getEvents();
    });
  }

  addEvent() {
    const newEvent = {
      id: null,
      name: '',
      eventURL: '',
      eventDate: new Date(),
      active: false,
    };
    this.eventsForm.reset();
    this.editEvent(newEvent);
  }

  deleteEvent(eventId: number) {
    this.removeEvent(eventId);
  }

  onSubmit(): void {
    if (this.eventsForm.valid && this.selectedFile) {
      const formData = new FormData();

      const schoolEvent = { ...this.eventsForm.value, eventType: 'image' };
      const eventBlob = new Blob([JSON.stringify(schoolEvent)], {
        type: 'application/json',
      });
      formData.append('schoolEvent', eventBlob);
      formData.append('imageFile', this.selectedFile);

      this.es.createEvent(formData).subscribe((res: any) => {
        console.log(res);
        this.getEvents();
      });

      this.addEditForm = false;
    }
  }

  onCancelEdit() {
    this.selectedEvent = null;
    this.addEditForm = false;
    this.eventsForm.reset({
      id: null,
      title: '',
      eventURL: '',
      imageUpload: null,
      isEnabled: false,
    });
  }
  onSelectEvent(event: any) {
    this.selectedEvent = event;
  }
}
