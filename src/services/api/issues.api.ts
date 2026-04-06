import axiosInstance from './axios';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';
import { Issue, CreateIssueDto, UpdateIssueDto } from '../../types/issue.types';

export const issuesApi = {
  getIssues: async (params?: any): Promise<ApiResponse<PaginatedResponse<Issue>>> => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Issue>>>('/issues', { params });
    return data;
  },

  getIssueById: async (id: string): Promise<ApiResponse<Issue>> => {
    const { data } = await axiosInstance.get<ApiResponse<Issue>>(`/issues/${id}`);
    return data;
  },

  createIssue: async (issue: CreateIssueDto): Promise<ApiResponse<Issue>> => {
    const { data } = await axiosInstance.post<ApiResponse<Issue>>('/issues', issue);
    return data;
  },

  updateIssue: async (id: string, issue: UpdateIssueDto): Promise<ApiResponse<Issue>> => {
    const { data } = await axiosInstance.patch<ApiResponse<Issue>>(`/issues/${id}`, issue);
    return data;
  },

  deleteIssue: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.delete<ApiResponse<void>>(`/issues/${id}`);
    return data;
  },

  assignIssue: async (id: string, technicianId: string): Promise<ApiResponse<Issue>> => {
    const { data } = await axiosInstance.post<ApiResponse<Issue>>(`/issues/${id}/assign`, { technicianId });
    return data;
  },

  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    const { data } = await axiosInstance.get<ApiResponse<any>>('/analytics/dashboard');
    return data;
  },
};
