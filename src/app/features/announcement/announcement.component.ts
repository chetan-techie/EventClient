import { Component } from '@angular/core';
import { AnnouncementService } from '../../core/services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css',
})
export class AnnouncementComponent {
  announcements: any;
  constructor(private announcement: AnnouncementService) {}

  ngOnInit() {
    this.announcement.getAnnouncements().subscribe((res: Array<any>) => {
      this.announcements = res.filter(
        (announcement: any) => announcement.status
      )[0];
    });
  }
}
