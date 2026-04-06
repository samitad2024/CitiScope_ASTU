import { issuesApi } from '../api/issues.api';
import { Issue, CreateIssueDto, UpdateIssueDto } from '../../types/issue.types';
import { PaginatedResponse } from '../../types/api.types';
import { issuesAdapter } from '../adapters/issues.adapter';

export const issuesRepository = {
  getIssues: async (params?: any): Promise<PaginatedResponse<Issue>> => {
    const response = await issuesApi.getIssues(params);
    if (response.success && response.data) {
      return {
        ...response.data,
        items: issuesAdapter.toIssueList(response.data.items),
      };
    }
    throw new Error(response.message || 'Failed to fetch issues');
  },

  getIssueById: async (id: string): Promise<Issue> => {
    const response = await issuesApi.getIssueById(id);
    if (response.success && response.data) {
      return issuesAdapter.toIssue(response.data);
    }
    throw new Error(response.message || 'Failed to fetch issue');
  },

  createIssue: async (issue: CreateIssueDto): Promise<Issue> => {
    const response = await issuesApi.createIssue(issue);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create issue');
  },

  updateIssue: async (id: string, issue: UpdateIssueDto): Promise<Issue> => {
    const response = await issuesApi.updateIssue(id, issue);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update issue');
  },

  deleteIssue: async (id: string): Promise<void> => {
    const response = await issuesApi.deleteIssue(id);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete issue');
    }
  },

  assignIssue: async (id: string, technicianId: string): Promise<Issue> => {
    const response = await issuesApi.assignIssue(id, technicianId);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to assign issue');
  },

  getDashboardStats: async (): Promise<any> => {
    const response = await issuesApi.getDashboardStats();
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch dashboard stats');
  },
};
