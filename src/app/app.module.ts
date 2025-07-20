import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FeaturesModule } from './features/features.module';
import { HomeComponent } from './features/home/home.component';
import { AnnouncementComponent } from './features/announcement/announcement.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './shared/components/header/header.component';
import { VisionClassesComponent } from './features/kalabharati/vision-classes/vision-classes.component';
import { DanceMusicComponent } from './features/kalabharati/dance-music/dance-music.component';
import { ArtPaintingComponent } from './features/kalabharati/art-painting/art-painting.component';
import { MusicInstrumentsComponent } from './features/kalabharati/music-instruments/music-instruments.component';
import { JyotishaComponent } from './features/kalabharati/jyotisha/jyotisha.component';
import { AuthInterceptor } from './core/interceptors/authInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    HomeComponent,
    AnnouncementComponent,
    HeaderComponent,
    DanceMusicComponent,
    ArtPaintingComponent,
    MusicInstrumentsComponent,
    VisionClassesComponent,
    JyotishaComponent,
  ],
  imports: [
    /**
     * Core Module
     */
    CoreModule,
    /**
     * Shared
     */
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FeaturesModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
