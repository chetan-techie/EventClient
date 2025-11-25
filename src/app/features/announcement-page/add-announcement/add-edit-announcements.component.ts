import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-announcements',
  templateUrl: './add-edit-announcements.component.html',
  styleUrls: ['./add-edit-announcements.component.scss'],
})
export class AddEditAnnouncementsComponent implements OnInit {
  @Input() data: any = {};
  @Output() updateData = new EventEmitter<any>();

  announcementForm!: FormGroup;
  priorities = ['Low', 'Normal', 'Medium', 'High'];
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.populateForm();
    }
  }

  ngOnChanges(): void {
    if (this.announcementForm) {
      if (this.data && this.data.id) {
        this.isEditMode = true;
        this.populateForm();
      } else {
        this.isEditMode = false;
        this.announcementForm.reset({
          status: true,
          priority: 'Normal',
        });
      }
    }
  }

  initForm(): void {
    this.announcementForm = this.fb.group({
      id: [null],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      announcement: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      priority: ['Normal', Validators.required],
      status: [true, Validators.required],
      dateTime: [new Date()],
      updatedBy: ['Admin'],
    });
  }

  populateForm(): void {
    this.announcementForm.patchValue({
      id: this.data.id,
      title: this.data.title || '',
      announcement: this.data.announcement || '',
      priority: this.data.priority || 'Normal',
      status: this.data.status !== undefined ? this.data.status : true,
      dateTime: this.data.dateTime || new Date(),
      updatedBy: this.data.updatedBy || 'Admin',
    });
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formValue = {
        ...this.announcementForm.value,
        dateTime: new Date().toISOString(),
      };
      this.updateData.emit(formValue);
    } else {
      this.markFormGroupTouched(this.announcementForm);
    }
  }

  onCancel(): void {
    this.announcementForm.reset({
      status: true,
      priority: 'Normal',
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get f() {
    return this.announcementForm.controls;
  }

  getCharacterCount(field: string): number {
    return this.announcementForm.get(field)?.value?.length || 0;
  }

  getMaxLength(field: string): number {
    return field === 'title' ? 100 : 1000;
  }
}
