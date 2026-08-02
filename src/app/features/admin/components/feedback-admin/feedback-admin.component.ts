import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Feedback {
  id: string;
  type: 'Unanymous' | 'Parents' | 'Alumni';
  name: string;
  email: string;
  message: string;
  verified: boolean;
  rating: number;
  createdAt?: string;
}

// Mock service - Replace with actual service
export class FeedbackService {
  getFeedbacks() {
    // Replace with actual API call
    return {
      subscribe: (observer: any) => {
        setTimeout(() => {
          observer.next([
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              type: 'Parents',
              name: 'Chetan Kumar',
              email: 'chetan.kumar@example.com',
              message:
                'The school has excellent teachers and a supportive environment.',
              verified: true,
              rating: 5,
              createdAt: '2024-01-15',
            },
            {
              id: '123e4567-e89b-12d3-a456-426614174001',
              type: 'Unanymous',
              name: 'Anonymous User',
              email: 'anonymous@example.com',
              message: 'Great infrastructure and facilities for students.',
              verified: false,
              rating: 4,
              createdAt: '2024-01-14',
            },
          ]);
        }, 500);
      },
    };
  }

  approveFeedback(id: string) {
    return {
      subscribe: (observer: any) => {
        setTimeout(() => observer.next({ success: true }), 300);
      },
    };
  }

  rejectFeedback(id: string) {
    return {
      subscribe: (observer: any) => {
        setTimeout(() => observer.next({ success: true }), 300);
      },
    };
  }

  deleteFeedback(id: string) {
    return {
      subscribe: (observer: any) => {
        setTimeout(() => observer.next({ success: true }), 300);
      },
    };
  }
}

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.css'],
})
export class FeedbackAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  paginatedFeedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  selectedTab: number = 0;
  isLoading: boolean = false;
  viewDetailsModal: boolean = false;
  searchQuery: string = '';

  // Pagination
  pageSize: number = 12; // Show 12 items per page
  pageIndex: number = 0;
  pageSizeOptions: number[] = [6, 12, 24, 48];
  totalItems: number = 0;

  // View mode toggle
  viewMode: 'grid' | 'list' = 'grid';

  // Tab configuration
  tabs = [
    {
      label: 'All Feedback',
      filter: 'all',
      icon: 'feedback',
    },
    {
      label: 'Parents',
      filter: 'Parents',
      icon: 'family_restroom',
    },
    {
      label: 'Alumni',
      filter: 'Alumni',
      icon: 'school',
    },
    {
      label: 'Anonymous',
      filter: 'Unanymous',
      icon: 'person_off',
    },
    {
      label: 'Pending Approval',
      filter: 'pending',
      icon: 'pending_actions',
    },
    {
      label: 'Approved',
      filter: 'approved',
      icon: 'verified',
    },
  ];

  // Inject FeedbackService in constructor - Replace with actual service injection
  private feedbackService = new FeedbackService();

  get pendingFeedbackCount(): number {
    return this.feedbacks.filter((f) => !f.verified).length;
  }
  get approvedFeedbackCount(): number {
    return this.feedbacks.filter((f) => f.verified).length;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getFeedbacks().subscribe({
      next: (feedbacks: Feedback[]) => {
        this.feedbacks = feedbacks;
        this.filterFeedbacksByTab();
        this.isLoading = false;
      },
      error: (error: any) => {
        this.showSnackBar('Error loading feedbacks', 'error');
        this.isLoading = false;
        console.error('Error loading feedbacks:', error);
      },
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.index;
    this.pageIndex = 0; // Reset to first page
    this.searchQuery = ''; // Clear search
    this.filterFeedbacksByTab();
    this.selectedFeedback = null;
  }

  filterFeedbacksByTab(): void {
    const currentFilter = this.tabs[this.selectedTab].filter;

    let filtered: Feedback[] = [];

    if (currentFilter === 'all') {
      filtered = [...this.feedbacks];
    } else if (currentFilter === 'pending') {
      filtered = this.feedbacks.filter((feedback) => !feedback.verified);
    } else if (currentFilter === 'approved') {
      filtered = this.feedbacks.filter((feedback) => feedback.verified);
    } else {
      filtered = this.feedbacks.filter(
        (feedback) => feedback.type === currentFilter
      );
    }

    // Apply search filter if exists
    if (this.searchQuery.trim()) {
      filtered = this.applySearchFilter(filtered, this.searchQuery);
    }

    this.filteredFeedbacks = filtered;
    this.totalItems = filtered.length;
    this.updatePaginatedData();
  }

  applySearchFilter(feedbacks: Feedback[], query: string): Feedback[] {
    const lowerQuery = query.toLowerCase().trim();
    return feedbacks.filter(
      (feedback) =>
        feedback.name.toLowerCase().includes(lowerQuery) ||
        feedback.email.toLowerCase().includes(lowerQuery) ||
        feedback.message.toLowerCase().includes(lowerQuery)
    );
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.pageIndex = 0; // Reset to first page on search
    this.filterFeedbacksByTab();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.pageIndex = 0;
    this.filterFeedbacksByTab();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updatePaginatedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFeedbacks = this.filteredFeedbacks.slice(
      startIndex,
      endIndex
    );
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  approveFeedback(feedback: Feedback, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Approve Feedback',
        message: `Are you sure you want to approve this feedback from ${feedback.name}?`,
        confirmText: 'Approve',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.feedbackService.approveFeedback(feedback.id).subscribe({
          next: () => {
            const index = this.feedbacks.findIndex((f) => f.id === feedback.id);
            if (index !== -1) {
              this.feedbacks[index].verified = true;
            }
            this.filterFeedbacksByTab();
            this.showSnackBar('Feedback approved successfully', 'success');
            this.isLoading = false;
          },
          error: (error: any) => {
            this.showSnackBar('Error approving feedback', 'error');
            this.isLoading = false;
            console.error('Error approving feedback:', error);
          },
        });
      }
    });
  }

  rejectFeedback(feedback: Feedback, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Reject Feedback',
        message: `Are you sure you want to reject this feedback from ${feedback.name}? This will unapprove it.`,
        confirmText: 'Reject',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.feedbackService.rejectFeedback(feedback.id).subscribe({
          next: () => {
            const index = this.feedbacks.findIndex((f) => f.id === feedback.id);
            if (index !== -1) {
              this.feedbacks[index].verified = false;
            }
            this.filterFeedbacksByTab();
            this.showSnackBar('Feedback rejected successfully', 'success');
            this.isLoading = false;
          },
          error: (error: any) => {
            this.showSnackBar('Error rejecting feedback', 'error');
            this.isLoading = false;
            console.error('Error rejecting feedback:', error);
          },
        });
      }
    });
  }

  deleteFeedback(feedbackId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Feedback',
        message:
          'Are you sure you want to delete this feedback? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.feedbackService.deleteFeedback(feedbackId).subscribe({
          next: () => {
            this.feedbacks = this.feedbacks.filter((f) => f.id !== feedbackId);
            this.filterFeedbacksByTab();
            this.showSnackBar('Feedback deleted successfully', 'success');
            this.isLoading = false;
          },
          error: (error: any) => {
            this.showSnackBar('Error deleting feedback', 'error');
            this.isLoading = false;
            console.error('Error deleting feedback:', error);
          },
        });
      }
    });
  }

  viewFeedbackDetails(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.viewDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.viewDetailsModal = false;
    this.selectedFeedback = null;
  }

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  private showSnackBar(
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
    });
  }

  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'Parents':
        return 'type-badge-parents';
      case 'Alumni':
        return 'type-badge-alumni';
      case 'Unanymous':
        return 'type-badge-anonymous';
      default:
        return '';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'Parents':
        return 'family_restroom';
      case 'Alumni':
        return 'school';
      case 'Unanymous':
        return 'person_off';
      default:
        return 'person';
    }
  }

  getPaginationLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length}`;
  }
}
