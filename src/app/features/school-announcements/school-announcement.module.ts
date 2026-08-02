import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AnnouncementComponent],
  exports: [AnnouncementComponent],
  imports: [CommonModule, SharedModule],
})
export class SchoolAnnouncementModule {}
