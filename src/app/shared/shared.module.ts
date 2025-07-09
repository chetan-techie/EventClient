import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsTileComponent } from './components/cards-tile/cards-tile.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SocialMediaLinksComponent } from './social-media-links/social-media-links.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { ImgCardComponent } from './img-card/img-card.component';

@NgModule({
  declarations: [
    CardsTileComponent,
    SocialMediaLinksComponent,
    FooterComponent,
    ImgCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    AppRoutingModule,
    CardsTileComponent,
    SocialMediaLinksComponent,
    ReactiveFormsModule,
    FooterComponent,
    ImgCardComponent,
  ],
})
export class SharedModule {}
