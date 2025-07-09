import { Component } from '@angular/core';
import { AnnouncementService } from '../../core/services/announcement.service';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './announcement-page.component.html',
  styleUrl: './announcement-page.component.css',
})
export class AnnouncementPageComponent {
  openForm: boolean = false;
  data: Array<any> = [];
  editAnnouncement: any = {};
  constructor(private service: AnnouncementService) {
    this.getData();
  }

  delete(id: string): void {
    this.service.deleteAnnouncement(id);
  }
  getData(): void {
    this.service.getAnnouncements().subscribe((res: any) => {
      this.data = res;
    });
  }
  addNew(): void {
    this.openForm = !this.openForm;
  }

  editData(data: any): void {
    this.openForm = true;
    this.editAnnouncement = data;
  }

  updateData(item: any): void {
    this.openForm = false;
    this.service.postAnnouncement(item).subscribe((res: any) => {
      const found = this.data.find((d: any) => d.id === item.id);
      if (found) {
        this.data = [...this.data, item];
      } else {
        this.data.push(item);
      }
      this.getData();
    });
  }
}
