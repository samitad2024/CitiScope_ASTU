import { Issue, User } from '../../types';
import { issueRepository } from '../repositories';

export const getIssues = (user?: User | null, filters?: Record<string, any>): Promise<Issue[]> => {
  return issueRepository.getIssues(user, filters);
};

export const getIssueById = (id: string): Promise<Issue | undefined> => {
  return issueRepository.getIssueById(id);
};

export const createIssue = (data: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> => {
  return issueRepository.createIssue(data);
};

export const updateIssue = (id: string, data: Partial<Issue>): Promise<Issue> => {
  return issueRepository.updateIssue(id, data);
};

export const deleteIssue = (id: string): Promise<void> => {
  return issueRepository.deleteIssue(id);
};

export const assignIssue = (issueId: string, technicianId: string): Promise<Issue> => {
  return issueRepository.assignIssue(issueId, technicianId);
};

export const changeIssueStatus = (issueId: string, status: Issue['status']): Promise<Issue> => {
  return issueRepository.changeIssueStatus(issueId, status);
};
