export type IssueStatus = 'reported' | 'verified' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type IssueCategory = 'road' | 'water' | 'electricity' | 'garbage' | 'drainage';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  region: string;
  zone: string;
  woreda: string;
  latitude: number;
  longitude: number;
  reportedBy: string;
  assignedTo?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssueDto {
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  region: string;
  zone: string;
  woreda: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
}

export interface UpdateIssueDto extends Partial<CreateIssueDto> {
  status?: IssueStatus;
  assignedTo?: string;
}
