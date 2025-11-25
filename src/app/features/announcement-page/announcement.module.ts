import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementPageComponent } from './announcement-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditAnnouncementsComponent } from './add-announcement/add-edit-announcements.component';
import { NewAnnouncementPageComponent } from './new-announcement-admin/new-annoucement-admin.component';

@NgModule({
  declarations: [
    AnnouncementPageComponent,
    NewAnnouncementPageComponent,
    AddEditAnnouncementsComponent,
  ],
  imports: [SharedModule],
})
export class AnnouncementModule {}
