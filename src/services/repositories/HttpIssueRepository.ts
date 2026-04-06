import { Issue, User } from '../../types';
import { apiClient } from '../../lib/api-client';
import { IssueRepository } from './IssueRepository';

export class HttpIssueRepository implements IssueRepository {
  async getIssues(user?: User | null, filters?: Record<string, any>): Promise<Issue[]> {
    const response = await apiClient.get<Issue[]>('/issues', { params: filters });
    return response.data;
  }

  async getIssueById(id: string): Promise<Issue | undefined> {
    const response = await apiClient.get<Issue>(`/issues/${id}`);
    return response.data;
  }

  async createIssue(issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    const response = await apiClient.post<Issue>('/issues', issue);
    return response.data;
  }

  async updateIssue(id: string, issue: Partial<Issue>): Promise<Issue> {
    const response = await apiClient.put<Issue>(`/issues/${id}`, issue);
    return response.data;
  }

  async deleteIssue(id: string): Promise<void> {
    await apiClient.delete(`/issues/${id}`);
  }

  async assignIssue(issueId: string, technicianId: string): Promise<Issue> {
    const response = await apiClient.post<Issue>(`/issues/${issueId}/assign`, { technicianId });
    return response.data;
  }

  async changeIssueStatus(issueId: string, status: Issue['status']): Promise<Issue> {
    const response = await apiClient.post<Issue>(`/issues/${issueId}/status`, { status });
    return response.data;
  }
}
