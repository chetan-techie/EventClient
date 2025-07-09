import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AnnouncementService } from '../../core/services/announcement.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-announcements',
  templateUrl: './add-edit-announcements.component.html',
  styleUrl: './add-edit-announcements.component.css',
})
export class AddEditAnnouncementsComponent implements OnChanges {
  @Input()
  data: any = {};
  @Output()
  updateData = new EventEmitter();
  formData = new FormGroup({
    id: new FormControl(''),
    announcement: new FormControl(''),
    status: new FormControl(false),
  });

  constructor(private service: AnnouncementService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.formData.patchValue({
        id: changes['data'].currentValue.id,
        announcement: changes['data'].currentValue.announcement,
        status: changes['data'].currentValue.status,
      });
    }
  }

  update(): void {
    this.updateData.emit(this.formData.value);
  }
}
