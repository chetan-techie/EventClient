// Add these imports to your module (e.g., events.module.ts or app.module.ts)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsAdminComponent } from './events-admin.component';
import { SafePipe } from './safe_pipe';
import { LoginComponent } from '../../../admin-login/new-form/admin-login.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, EventsAdminComponent, SafePipe],
  imports: [SharedModule],
  exports: [EventsAdminComponent],
})
export class EventsModule {}
