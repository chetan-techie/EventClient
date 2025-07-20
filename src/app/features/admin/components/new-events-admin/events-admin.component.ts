import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EventsService,
  SchoolEvent,
} from '../../../../core/services/events.service';
import { baseImageUrl } from '../../../../shared/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css'],
})
export class EventsAdminComponent implements OnInit {
  events: SchoolEvent[] = [];
  filteredEvents: SchoolEvent[] = [];
  eventsForm: FormGroup;
  selectedFile: File | null = null;
  imageData: string = 'null';
  selectedEvent: SchoolEvent | null = null;
  addEditForm: boolean = false;
  selectedTab: number = 0;
  isLoading: boolean = false;
  imagePreview: string | null = null;

  // Tab configuration
  tabs = [
    {
      label: 'Event Gallery',
      eventType: 'image' as const,
      icon: 'photo_library',
    },
    {
      label: 'Event Videos',
      eventType: 'video' as const,
      icon: 'video_library',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private es: EventsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.eventsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      eventDate: ['', Validators.required],
      eventType: ['image'],
      eventURL: [''],
      active: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEvents();
    this.setupFormValidation();
  }

  setupFormValidation(): void {
    // Dynamic validation based on event type
    this.eventsForm.get('eventType')?.valueChanges.subscribe((eventType) => {
      const eventURLControl = this.eventsForm.get('eventURL');

      if (eventType === 'video') {
        eventURLControl?.setValidators([
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
          ),
        ]);
      } else {
        eventURLControl?.setValidators([Validators.pattern(/^https?:\/\/.+/)]);
      }

      eventURLControl?.updateValueAndValidity();
    });
  }

  getEvents(): void {
    this.isLoading = true;
    this.es.getEvents().subscribe({
      next: (events: SchoolEvent[]) => {
        this.events = events.map((event: SchoolEvent) => ({
          ...event,
          imagePath: event.imagePath
            ? `${baseImageUrl}/${event.imagePath}`
            : event.imagePath, // Keep undefined if no imagePath
        }));
        this.filterEventsByTab();
        this.isLoading = false;
      },
      error: (error: any) => {
        this.showSnackBar('Error loading events', 'error');
        this.isLoading = false;
        console.error('Error loading events:', error);
      },
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.index;
    this.filterEventsByTab();
    this.onCancelEdit();
  }

  filterEventsByTab(): void {
    const currentEventType = this.tabs[this.selectedTab].eventType;
    this.filteredEvents = this.events.filter(
      (event) => event.eventType === currentEventType
    );
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];

      // Validate file type and size
      if (!this.validateFile(this.selectedFile)) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageData = e.target.result.split(',')[1];
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      this.showSnackBar(
        'Please select a valid image file (JPEG, PNG, GIF, WebP)',
        'error'
      );
      return false;
    }

    if (file.size > maxSize) {
      this.showSnackBar('File size must be less than 5MB', 'error');
      return false;
    }

    return true;
  }

  editEvent(event: SchoolEvent): void {
    this.addEditForm = true;
    this.selectedEvent = { ...event };

    this.eventsForm.patchValue({
      id: event.id,
      name: event.name,
      eventURL: event.eventURL || '',
      eventDate: event.eventDate,
      eventType: event.eventType || this.tabs[this.selectedTab].eventType,
      active: event.active,
    });

    this.eventsForm.get('active')?.markAsTouched();
    this.eventsForm.get('active')?.markAsDirty();

    // Set image preview if editing existing event
    if (event.imagePath && event.eventType === 'image') {
      this.imagePreview = event.imagePath;
    }
  }

  removeEvent(eventId: string | number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Event',
        message:
          'Are you sure you want to delete this event? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.es.deleteEvent(eventId.toString()).subscribe({
          next: (res: any) => {
            this.events = this.events.filter((event) => event.id !== eventId);
            this.filterEventsByTab();
            this.showSnackBar('Event deleted successfully', 'success');
          },
          error: (error: any) => {
            this.showSnackBar('Error deleting event', 'error');
            console.error('Error deleting event:', error);
          },
        });
      }
    });
  }

  addEvent(): void {
    const currentEventType = this.tabs[this.selectedTab].eventType;
    const newEvent: SchoolEvent = {
      id: null,
      name: '',
      eventURL: '',
      eventDate: new Date().toISOString().split('T')[0],
      eventType: currentEventType,
      active: false,
    };

    this.eventsForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.editEvent(newEvent);
  }

  deleteEvent(eventId: any): void {
    this.removeEvent(eventId);
  }

  onSubmit(): void {
    if (!this.eventsForm.valid) {
      this.markFormGroupTouched(this.eventsForm);
      this.showSnackBar(
        'Please fill in all required fields correctly',
        'error'
      );
      return;
    }

    const eventType = this.eventsForm.value.eventType;

    // For image events, require file upload for new events
    if (
      eventType === 'image' &&
      !this.selectedFile &&
      !this.selectedEvent?.id
    ) {
      this.showSnackBar('Please select an image file', 'error');
      return;
    }

    this.isLoading = true;
    const formValue = this.eventsForm.value;
    const isUpdate = formValue.id && formValue.id !== null;

    // Determine if we need to use FormData (for file uploads) or just the event object
    if (this.selectedFile || eventType === 'image') {
      // Use FormData for file uploads
      const formData = new FormData();
      const schoolEvent = { ...formValue };
      const eventBlob = new Blob([JSON.stringify(schoolEvent)], {
        type: 'application/json',
      });

      formData.append('schoolEvent', eventBlob);

      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      }

      const operation = isUpdate
        ? this.es.updateEvent(formValue.id.toString(), formData)
        : this.es.createEvent(formData);

      operation.subscribe({
        next: (res: SchoolEvent) => {
          this.handleSubmitSuccess(isUpdate);
        },
        error: (error: any) => {
          this.handleSubmitError(error);
        },
      });
    } else {
      // Use regular object for video events without files
      const schoolEvent: SchoolEvent = {
        id: formValue.id,
        name: formValue.name,
        eventDate: formValue.eventDate,
        eventType: formValue.eventType,
        eventURL: formValue.eventURL || undefined,
        active: formValue.active,
      };

      const operation = isUpdate
        ? this.es.updateEvent(formValue.id.toString(), schoolEvent)
        : this.es.createEvent(schoolEvent);

      operation.subscribe({
        next: (res: SchoolEvent) => {
          this.handleSubmitSuccess(isUpdate);
        },
        error: (error: any) => {
          this.handleSubmitError(error);
        },
      });
    }
  }

  private handleSubmitSuccess(isUpdate: boolean): void {
    this.getEvents();
    this.addEditForm = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.showSnackBar(
      isUpdate ? 'Event updated successfully' : 'Event created successfully',
      'success'
    );
    this.isLoading = false;
  }

  private handleSubmitError(error: any): void {
    this.showSnackBar('Error saving event', 'error');
    this.isLoading = false;
    console.error('Error saving event:', error);
  }

  onCancelEdit(): void {
    this.selectedEvent = null;
    this.addEditForm = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.eventsForm.reset({
      id: null,
      name: '',
      eventURL: '',
      eventDate: '',
      eventType: this.tabs[this.selectedTab].eventType,
      active: false,
    });
  }

  onSelectEvent(event: SchoolEvent): void {
    this.selectedEvent = event;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showSnackBar(
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.eventsForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${fieldName} must be at least 3 characters long`;
    }
    if (control?.hasError('pattern')) {
      if (
        fieldName === 'eventURL' &&
        this.eventsForm.get('eventType')?.value === 'video'
      ) {
        return 'Please enter a valid YouTube URL';
      }
      return 'Please enter a valid URL';
    }
    return '';
  }

  getYouTubeEmbedUrl(url: string | undefined): string {
    if (!url) return '';

    // Convert YouTube URL to embed URL
    const videoId = this.extractYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  private extractYouTubeVideoId(url: string | undefined): string | null {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  isCurrentEventType(eventType: 'image' | 'video'): boolean {
    return this.tabs[this.selectedTab].eventType === eventType;
  }

  // Helper methods for template to handle optional properties
  getEventURL(event: SchoolEvent): string {
    return event.eventURL || '';
  }

  getEventImagePath(event: SchoolEvent): string {
    return event.imagePath || '';
  }

  hasEventURL(event: SchoolEvent): boolean {
    return !!event.eventURL;
  }

  hasImagePath(event: SchoolEvent): boolean {
    return !!event.imagePath;
  }
}
