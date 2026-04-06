import { create } from 'zustand';
import { Issue } from '../../types';

interface IssuesState {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  selectedIssueId: string | null;
  setSelectedIssueId: (id: string | null) => void;
}

export const useIssuesStore = create<IssuesState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),
  selectedIssueId: null,
  setSelectedIssueId: (id) => set({ selectedIssueId: id }),
}));
