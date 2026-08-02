import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { baseUrl } from '../../shared/utils/utils';

export interface TestimonialRequest {
  type: string;
  name: string;
  email: string;
  anonymous: boolean;
  message: string;
  rating: number;
}

export interface FeedbackRequest {
  type: 'parent' | 'guest';
  name?: string;
  email?: string;
  category: string;
  subject: string;
  message: string;
  rating: number;
  isAnonymous: boolean;
}

export interface TestimonialResponse {
  id: string;
  name: string;
  graduationYear: number;
  course: string;
  message: string;
  rating: number;
  photo?: string;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FeedbackResponse {
  id: string;
  message: string;
  success: boolean;
  ticketNumber?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly apiUrl = baseUrl || 'https://api.yourschool.edu';
  private testimonialsSubject = new BehaviorSubject<TestimonialResponse[]>([]);
  public testimonials$ = this.testimonialsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTestimonials();
  }

  // Testimonials API calls
  submitTestimonial(
    testimonialData: TestimonialRequest
  ): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(
      `${this.apiUrl}/api/feedback/`,
      testimonialData,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      }
    );
  }

  // Feedback API calls
  submitFeedback(feedbackData: FeedbackRequest): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(
      `${this.apiUrl}/feedback`,
      feedbackData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      }
    );
  }

  // Get approved testimonials
  getTestimonials(
    page: number = 1,
    limit: number = 10
  ): Observable<TestimonialResponse[]> {
    return this.http.get<TestimonialResponse[]>(`${this.apiUrl}/api/feedback/`);
  }

  // Get featured testimonials
  getFeaturedTestimonials(): Observable<TestimonialResponse[]> {
    return this.http.get<TestimonialResponse[]>(
      `${this.apiUrl}/testimonials/featured`
    );
  }

  // Admin APIs (if needed)
  getUnverifiedTestimonials(): Observable<TestimonialResponse[]> {
    return this.http.get<TestimonialResponse[]>(
      `${this.apiUrl}/admin/testimonials/pending`,
      { headers: this.getAuthHeaders() }
    );
  }

  approveTestimonial(id: string, featured: boolean = false): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/admin/testimonials/${id}/approve`,
      { featured },
      { headers: this.getAuthHeaders() }
    );
  }

  private loadTestimonials() {
    this.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonialsSubject.next(testimonials);
      },
      error: (error) => {
        console.error('Error loading testimonials:', error);
        // Fallback to mock data for development
        this.testimonialsSubject.next(this.getMockTestimonials());
      },
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('admin_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Mock data for development
  private getMockTestimonials(): TestimonialResponse[] {
    return [
      {
        id: '1',
        name: 'Sarah Johnson',
        graduationYear: 2020,
        course: 'Computer Science',
        message:
          'The foundation I received here was incredible. The teachers not only taught us academics but also life skills that helped me succeed in my career at Google.',
        rating: 5,
        photo: '/assets/images/testimonials/sarah.jpg',
        isVerified: true,
        isFeatured: true,
        createdAt: new Date('2024-01-15'),
        status: 'approved',
      },
      {
        id: '2',
        name: 'Michael Chen',
        graduationYear: 2019,
        course: 'Business Administration',
        message:
          'The entrepreneurship program here gave me the confidence to start my own company. Today, my startup employs 50+ people.',
        rating: 5,
        isVerified: true,
        isFeatured: true,
        createdAt: new Date('2024-01-10'),
        status: 'approved',
      },
      {
        id: '3',
        name: 'Emma Rodriguez',
        graduationYear: 2021,
        course: 'Arts & Literature',
        message:
          "The creative environment and supportive faculty helped me develop my writing skills. I've now published three novels!",
        rating: 5,
        isVerified: true,
        isFeatured: false,
        createdAt: new Date('2024-01-08'),
        status: 'approved',
      },
    ];
  }
}
