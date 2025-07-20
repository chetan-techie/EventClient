import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../core/services/announcement.service';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './new-announcement-admin.component.html',
  styleUrl: './new-announcement-admin.component.scss',
})
export class NewAnnouncementPageComponent implements OnInit {
  openForm: boolean = false;
  data: Array<any> = [];
  filteredData: Array<any> = [];
  editAnnouncement: any = {};
  loading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  sortBy: string = 'dateTime';
  sortOrder: string = 'desc';
  showDeleteConfirm: boolean = false;
  itemToDelete: any = null;

  // Stats
  totalAnnouncements: number = 0;
  activeAnnouncements: number = 0;
  inactiveAnnouncements: number = 0;

  constructor(private service: AnnouncementService) {}

  ngOnInit(): void {
    this.getData();
  }

  delete(item: any): void {
    this.itemToDelete = item;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.loading = true;
      this.service.deleteAnnouncement(this.itemToDelete.id).subscribe(() => {
        this.getData();
        this.showDeleteConfirm = false;
        this.itemToDelete = null;
        this.loading = false;
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.itemToDelete = null;
  }

  getData(): void {
    this.loading = true;
    this.service.getAnnouncements().subscribe((res: any) => {
      this.data = res;
      this.filteredData = [...this.data];
      this.calculateStats();
      this.applyFilters();
      this.loading = false;
    });
  }

  addNew(): void {
    this.editAnnouncement = {};
    this.openForm = true;
  }

  editData(data: any): void {
    this.openForm = true;
    this.editAnnouncement = { ...data };
  }

  closeForm(): void {
    this.openForm = false;
    this.editAnnouncement = {};
  }

  updateData(item: any): void {
    this.loading = true;
    this.service.postAnnouncement(item).subscribe((res: any) => {
      this.openForm = false;
      this.editAnnouncement = {};
      this.getData();
    });
  }

  toggleStatus(item: any): void {
    const updatedItem = { ...item, status: !item.status };
    this.loading = true;
    this.service.postAnnouncement(updatedItem).subscribe(() => {
      this.getData();
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusFilter(): void {
    this.applyFilters();
  }

  onSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.data];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.announcement
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (this.selectedStatus !== 'all') {
      const isActive = this.selectedStatus === 'active';
      filtered = filtered.filter((item) => item.status === isActive);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[this.sortBy];
      let bVal = b[this.sortBy];

      if (this.sortBy === 'dateTime') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (this.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    this.filteredData = filtered;
  }

  private calculateStats(): void {
    this.totalAnnouncements = this.data.length;
    this.activeAnnouncements = this.data.filter((item) => item.status).length;
    this.inactiveAnnouncements =
      this.totalAnnouncements - this.activeAnnouncements;
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'fa-exclamation-triangle';
      case 'medium':
        return 'fa-exclamation-circle';
      case 'low':
        return 'fa-info-circle';
      default:
        return 'fa-minus';
    }
  }

  truncateText(text: string, limit: number = 100): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
