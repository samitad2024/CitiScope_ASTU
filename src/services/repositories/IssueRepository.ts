import { Issue, User } from '../../types';

export interface IssueRepository {
  getIssues(user?: User | null, filters?: Record<string, any>): Promise<Issue[]>;
  getIssueById(id: string): Promise<Issue | undefined>;
  createIssue(issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue>;
  updateIssue(id: string, issue: Partial<Issue>): Promise<Issue>;
  deleteIssue(id: string): Promise<void>;
  assignIssue(issueId: string, technicianId: string): Promise<Issue>;
  changeIssueStatus(issueId: string, status: Issue['status']): Promise<Issue>;
}
