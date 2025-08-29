import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackSystemComponent } from './feedback-system/feedback-system.component';
import { FeedbackService } from '../../core/services/feedback.service';

@NgModule({
  declarations: [FeedbackSystemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [FeedbackService],
  exports: [FeedbackSystemComponent],
})
export class FeedbackSystemModule {}
