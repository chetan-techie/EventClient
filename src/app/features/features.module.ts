import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ParentsComponent } from './parents/parents.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { CurricularComponent } from './curricular/curricular.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEditAnnouncementsComponent } from './add-edit-announcements/add-edit-announcements.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { GalleryEventsComponent } from './gallery-events/gallery-events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LeadersListComponent } from './leaders-list/leaders-list.component';
import { MandatoryDisclosureComponent } from './mandatory-disclosure/mandatory-disclosure.component';
import { KalabharatiComponent } from './kalabharati/kalabharati.component';
import { HallOfFameComponent } from './achievements/hall-of-fame/hall-of-fame.component';
import { SslcResultsComponent } from './achievements/sslc-results/sslc-results.component';
import { ExcellenceComponent } from './achievements/excellence/excellence.component';
import { CocurricularComponent } from './academics/cocurricular/cocurricular.component';
import { CalendarEventsComponent } from './academics/calendar-events/calendar-events.component';
import { KalabharatiModule } from './kalabharati/kalabharati.module';
import { EventsAdminComponent } from './admin/components/events-admin/events-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from './admin/components/new-events-admin/module_imports';
import { NewAnnouncementPageComponent } from './announcement-page/new-announcement-admin/new-annoucement-admin.component';
import { EventsVideoComponent } from './events-video/events-video.component';

@NgModule({
  declarations: [
    ContactUsComponent,
    AboutUsComponent,
    ParentsComponent,
    AchievementsComponent,
    CurricularComponent,
    AdminComponent,
    PageNotFoundComponent,
    AddEditAnnouncementsComponent,
    AnnouncementPageComponent,
    NewAnnouncementPageComponent,
    GalleryEventsComponent,
    AdminLoginComponent,
    LeadersListComponent,
    MandatoryDisclosureComponent,
    KalabharatiComponent,
    HallOfFameComponent,
    SslcResultsComponent,
    ExcellenceComponent,
    CocurricularComponent,
    CalendarEventsComponent,
    EventsAdminComponent,
    EventsVideoComponent,
  ],
  imports: [
    SharedModule,
    KalabharatiModule,
    FormsModule,
    ReactiveFormsModule,
    EventsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesModule {}
