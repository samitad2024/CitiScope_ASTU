import { Issue } from '../../types/issue.types';

export const issuesAdapter = {
  toIssue: (data: any): Issue => {
    return {
      ...data,
      // Any transformation logic here (e.g., date strings to Date objects)
    };
  },
  
  toIssueList: (data: any[]): Issue[] => {
    return data.map(issuesAdapter.toIssue);
  },
};
