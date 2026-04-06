import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssues, getIssueById, createIssue } from './api';
import { Issue } from '../../types';
import { useAuthStore } from '../../hooks/useAuth';

import { useIssuesStore } from './store';
import { useUIStore } from '../../hooks/useUI';
import { useEffect } from 'react';

export const useIssues = () => {
  const { user } = useAuthStore();
  const { selectedFilters } = useUIStore();
  const { setIssues } = useIssuesStore();
  
  const query = useQuery({
    queryKey: ['issues', user?.id, selectedFilters],
    queryFn: () => getIssues(user, selectedFilters),
  });

  useEffect(() => {
    if (query.data) {
      setIssues(query.data);
    }
  }, [query.data, setIssues]);

  return query;
};

export const useIssue = (id: string) => {
  return useQuery({
    queryKey: ['issues', id],
    queryFn: () => getIssueById(id),
    enabled: !!id,
  });
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
};
