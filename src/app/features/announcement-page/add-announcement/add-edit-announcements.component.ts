import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Announcement {
  id?: number;
  announcement: string;
  status: boolean;
  dateTime: Date;
}

@Component({
  selector: 'app-add-edit-announcements',
  templateUrl: './add-edit-announcements.component.html',
  styleUrls: ['./add-edit-announcements.component.css'],
})
export class AddEditAnnouncementsComponent implements OnInit, OnChanges {
  @Input() data: Announcement | null = null;
  @Output() updateData = new EventEmitter<{
    action: string;
    data: Announcement;
  }>();

  announcementForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.announcementForm = this.fb.group({
      announcement: ['', [Validators.required, Validators.minLength(3)]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.data) {
      this.isEditMode = true;
      this.announcementForm.patchValue({
        announcement: this.data.announcement,
        status: this.data.status,
      });
    } else {
      this.isEditMode = false;
      this.announcementForm.reset({
        announcement: '',
        status: true,
      });
    }
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value;
      const announcementData: Announcement = {
        announcement: formValue.announcement,
        status: formValue.status,
        dateTime: new Date(),
      };

      if (this.isEditMode && this.data?.id) {
        announcementData.id = this.data.id;
        this.updateData.emit({ action: 'update', data: announcementData });
      } else {
        this.updateData.emit({ action: 'add', data: announcementData });
      }

      this.resetForm();
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.updateData.emit({ action: 'cancel', data: {} as Announcement });
  }

  private resetForm(): void {
    this.announcementForm.reset({
      announcement: '',
      status: true,
    });
    this.isEditMode = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.announcementForm.controls).forEach((key) => {
      const control = this.announcementForm.get(key);
      control?.markAsTouched();
    });
  }

  get announcement() {
    return this.announcementForm.get('announcement');
  }
  get status() {
    return this.announcementForm.get('status');
  }
}
