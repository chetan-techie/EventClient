// Add these imports to your module (e.g., events.module.ts or app.module.ts)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EventsAdminComponent } from './events-admin.component';
import { SafePipe } from './safe_pipe';
import { LoginComponent } from '../../../admin-login/new-form/admin-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    EventsAdminComponent,
    SafePipe, // Add this custom pipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [EventsAdminComponent],
})
export class EventsModule {}
