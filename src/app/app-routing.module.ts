import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { ParentsComponent } from './features/parents/parents.component';
import { CurricularComponent } from './features/curricular/curricular.component';
import { AdminComponent } from './features/admin/admin.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AnnouncementPageComponent } from './features/announcement-page/announcement-page.component';
import { MandatoryDisclosureComponent } from './features/mandatory-disclosure/mandatory-disclosure.component';
import { KalabharatiComponent } from './features/kalabharati/kalabharati.component';
import { HallOfFameComponent } from './features/achievements/hall-of-fame/hall-of-fame.component';
import { SslcResultsComponent } from './features/achievements/sslc-results/sslc-results.component';
import { ExcellenceComponent } from './features/achievements/excellence/excellence.component';
import { CocurricularComponent } from './features/academics/cocurricular/cocurricular.component';
import { CalendarEventsComponent } from './features/academics/calendar-events/calendar-events.component';
import { DanceMusicComponent } from './features/kalabharati/dance-music/dance-music.component';
import { ArtPaintingComponent } from './features/kalabharati/art-painting/art-painting.component';
import { MusicInstrumentsComponent } from './features/kalabharati/music-instruments/music-instruments.component';
import { VisionClassesComponent } from './features/kalabharati/vision-classes/vision-classes.component';
import { JyotishaComponent } from './features/kalabharati/jyotisha/jyotisha.component';
import { GalleryEventsComponent } from './features/gallery-events/gallery-events.component';
import { EventsAdminComponent } from './features/admin/components/new-events-admin/events-admin.component';
import { LoginComponent } from './features/admin-login/new-form/admin-login.component';
import { AdminRouteGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { NewAnnouncementPageComponent } from './features/announcement-page/new-announcement-admin/new-annoucement-admin.component';
import { EventsVideoComponent } from './features/events-video/events-video.component';

const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'mandatory-disclosure',
    component: MandatoryDisclosureComponent,
  },
  {
    path: 'facilities',
    component: ParentsComponent,
  },
  {
    path: 'hallOfFame',
    component: HallOfFameComponent,
  },
  {
    path: 'sslcResults',
    component: SslcResultsComponent,
  },
  {
    path: 'excellence',
    component: ExcellenceComponent,
  },
  {
    path: 'curriculum',
    component: CurricularComponent,
  },
  {
    path: 'calendarEvents',
    component: CalendarEventsComponent,
  },
  {
    path: 'cocurricular',
    component: CocurricularComponent,
  },
  {
    path: 'gallery-events',
    component: GalleryEventsComponent,
  },
  {
    path: 'events-video',
    component: EventsVideoComponent,
  },
  {
    path: 'kalabharati',
    component: KalabharatiComponent,
    children: [
      { path: 'vision_classes', component: VisionClassesComponent },
      { path: 'dance_music', component: DanceMusicComponent },
      {
        path: 'art_painting',
        component: ArtPaintingComponent,
      },
      {
        path: 'instruments',
        component: MusicInstrumentsComponent,
      },
      {
        path: 'jyotisha',
        component: JyotishaComponent,
      },
      { path: '', redirectTo: 'vision_classes', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminRouteGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'announcements',
        component: NewAnnouncementPageComponent,
      },
      {
        path: 'dashboard',
        component: EventsAdminComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
