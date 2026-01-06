// feedback-system.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FeedbackService } from '../../../core/services/feedback.service';

interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

interface Feedback {
  id: string;
  type: 'parent' | 'guest';
  name?: string;
  email?: string;
  message: string;
  rating: number;
  isAnonymous: boolean;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: Date;
}

@Component({
  selector: 'app-feedback-system',
  templateUrl: './feedback-system.component.html',
  styleUrls: ['./feedback-system.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class FeedbackSystemComponent implements OnInit {
  activeTab: string = 'alumini';
  testimonialForm: FormGroup;
  feedbackForm: FormGroup;
  isSubmitting: boolean = false;
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  graduationYears: number[] = [];

  // Sample data - replace with actual API calls
  featuredTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      message:
        'The holistic education approach at Bharatiya Vidya Bhavan shaped not just my career but my character. The values instilled here have guided me through my journey as a software engineer at Microsoft and now as an entrepreneur.',
      rating: 5,
      isVerified: true,
      isFeatured: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Arjun Krishnamurthy',
      message:
        "The institution's emphasis on traditional values combined with modern education prepared me well for the corporate world. I am now a Chartered Accountant with one of the Big Four firms, thanks to the strong foundation laid here.",
      rating: 5,
      isVerified: true,
      isFeatured: true,
      createdAt: new Date('2024-01-10'),
    },
  ];

  displayedTestimonials: Testimonial[] = [];

  constructor(private fb: FormBuilder, private feedbservice: FeedbackService) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadTestimonials();
  }

  initializeForms() {
    this.testimonialForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(1000),
        ],
      ],
      rating: [0, [Validators.required, Validators.min(1)]],
      anonymous: [false],
    });

    this.feedbackForm = this.fb.group({
      type: ['parent', Validators.required],
      name: [''],
      email: [''],
      isAnonymous: [false],
      message: ['', [Validators.required, Validators.minLength(20)]],
      rating: [0, [Validators.required, Validators.min(1)]],
    });

    // Add conditional validators for feedback form
    this.feedbackForm
      .get('isAnonymous')
      ?.valueChanges.subscribe((isAnonymous) => {
        const nameControl = this.feedbackForm.get('name');
        const emailControl = this.feedbackForm.get('email');

        if (isAnonymous) {
          nameControl?.clearValidators();
          emailControl?.clearValidators();
        } else {
          nameControl?.setValidators([Validators.required]);
          emailControl?.setValidators([Validators.required, Validators.email]);
        }

        nameControl?.updateValueAndValidity();
        emailControl?.updateValueAndValidity();
      });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setRating(formType: string, rating: number) {
    if (formType === 'testimonial') {
      this.testimonialForm.patchValue({ rating });
    } else {
      this.feedbackForm.patchValue({ rating });
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  }

  async submitTestimonial() {
    if (this.testimonialForm.valid) {
      this.isSubmitting = true;

      try {
        // Simulate API call
        this.feedbservice
          .submitTestimonial(this.testimonialForm.value)
          .subscribe({
            next: (response) => {
              console.log('Testimonial submitted:', response);
              this.showSuccess(
                'Thank you for sharing your testimonial! Your submission has been received and will be reviewed by our team. Once approved, it will inspire future students.'
              );
              this.testimonialForm.reset();
              this.setActiveTab('view-testimonials');
            },
            error: (error) => {
              console.error('Error submitting testimonial:', error);
            },
          });
        await this.delay(2000);

        console.log('Testimonial submitted:', this.testimonialForm.value);
        this.showSuccess(
          'Thank you for sharing your testimonial! Your submission has been received and will be reviewed by our team. Once approved, it will inspire future students.'
        );
        this.testimonialForm.reset();
        this.setActiveTab('view-testimonials');
      } catch (error) {
        console.error('Error submitting testimonial:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  async submitFeedback() {
    if (this.feedbackForm.valid) {
      this.isSubmitting = true;

      try {
        // Simulate API call
        await this.delay(2000);

        console.log('Feedback submitted:', this.feedbackForm.value);
        this.showSuccess(
          'Thank you for your valuable feedback! We have received your message and our team will review it carefully. If a response is required, we will get back to you soon.'
        );
        this.feedbackForm.reset();
        this.feedbackForm.patchValue({
          type: 'parent',
          isAnonymous: false,
          rating: 0,
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  showSuccess(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }

  loadTestimonials() {
    this.feedbservice.testimonials$.subscribe((testimonials) => {
      this.displayedTestimonials = testimonials;
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
