export interface Announcement {
  id?: number;
  announcement: string;
  title?: string;
  status: boolean;
  dateTime: Date | string;
  priority?: AnnouncementPriority;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  category?: string;
  targetAudience?: string[];
  expiryDate?: Date | string;
  isUrgent?: boolean;
}

export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface AnnouncementStats {
  totalAnnouncements: number;
  activeAnnouncements: number;
  inactiveAnnouncements: number;
  highPriorityAnnouncements?: number;
  expiringSoonAnnouncements?: number;
}

export interface AnnouncementFilter {
  searchTerm: string;
  selectedStatus: AnnouncementStatus;
  priority?: AnnouncementPriority | 'all';
  sortBy: AnnouncementSortField;
  sortOrder: SortOrder;
}

export enum AnnouncementStatus {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AnnouncementSortField {
  DATE_TIME = 'dateTime',
  TITLE = 'title',
  ANNOUNCEMENT = 'announcement',
  STATUS = 'status',
  PRIORITY = 'priority',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface AnnouncementFormData {
  action: AnnouncementAction;
  data: Announcement;
}

export enum AnnouncementAction {
  ADD = 'add',
  UPDATE = 'update',
  CANCEL = 'cancel',
}
