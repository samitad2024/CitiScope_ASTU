import { Issue, User } from '../../types';
import { mockIssues } from '../mock';
import { IssueRepository } from './IssueRepository';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockIssueRepository implements IssueRepository {
  async getIssues(user?: User | null, filters?: Record<string, any>): Promise<Issue[]> {
    console.log('MOCK: GET /api/issues', user?.role, filters);
    await delay(800);
    
    if (!user) return [];
    
    let issues = [...mockIssues];

    // RBAC Filtering
    if (user.role === 'regional_admin') {
      issues = issues.filter(issue => issue.region === user.region);
    } else if (user.role === 'zonal_admin') {
      issues = issues.filter(issue => issue.region === user.region && issue.zone === user.zone);
    } else if (user.role === 'woreda_admin') {
      issues = issues.filter(issue => 
        issue.region === user.region && 
        issue.zone === user.zone && 
        issue.woreda === user.woreda
      );
    } else if (user.role === 'technician') {
      issues = issues.filter(issue => issue.assignedTo === user.id);
    } else if (user.role !== 'federal_admin') {
      return [];
    }
    
    if (filters) {
      if (filters.status) {
        issues = issues.filter(i => i.status === filters.status);
      }
      if (filters.priority) {
        issues = issues.filter(i => i.priority === filters.priority);
      }
      if (filters.category) {
        issues = issues.filter(i => i.category === filters.category);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        issues = issues.filter(i => 
          i.title.toLowerCase().includes(search) || 
          i.description.toLowerCase().includes(search)
        );
      }
    }
    
    return issues;
  }

  async getIssueById(id: string): Promise<Issue | undefined> {
    console.log(`MOCK: GET /api/issues/${id}`);
    await delay(500);
    return mockIssues.find((issue) => issue.id === id);
  }

  async createIssue(data: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    console.log('MOCK: POST /api/issues', data);
    await delay(1000);
    const newIssue: Issue = {
      ...data,
      id: `ISS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockIssues.push(newIssue);
    return newIssue;
  }

  async updateIssue(id: string, data: Partial<Issue>): Promise<Issue> {
    console.log(`MOCK: PUT /api/issues/${id}`, data);
    await delay(800);
    const index = mockIssues.findIndex((issue) => issue.id === id);
    if (index === -1) throw new Error('Issue not found');
    
    const updatedIssue = {
      ...mockIssues[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockIssues[index] = updatedIssue;
    return updatedIssue;
  }

  async deleteIssue(id: string): Promise<void> {
    console.log(`MOCK: DELETE /api/issues/${id}`);
    await delay(600);
    const index = mockIssues.findIndex((issue) => issue.id === id);
    if (index !== -1) {
      mockIssues.splice(index, 1);
    }
  }

  async assignIssue(issueId: string, technicianId: string): Promise<Issue> {
    console.log(`MOCK: POST /api/issues/${issueId}/assign`, { technicianId });
    return this.updateIssue(issueId, { assignedTo: technicianId, status: 'assigned' });
  }

  async changeIssueStatus(issueId: string, status: Issue['status']): Promise<Issue> {
    console.log(`MOCK: POST /api/issues/${issueId}/status`, { status });
    return this.updateIssue(issueId, { status });
  }
}
