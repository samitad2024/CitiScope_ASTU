import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { issuesRepository } from '../services/repositories/issues.repository';
import { CreateIssueDto, UpdateIssueDto } from '../types/issue.types';
import { toast } from 'sonner';

export const useIssues = (params?: any) => {
  const queryClient = useQueryClient();

  const issuesQuery = useQuery({
    queryKey: ['issues', params],
    queryFn: () => issuesRepository.getIssues(params),
    staleTime: 1000 * 30, // 30 seconds
  });

  const issueQuery = (id: string) => useQuery({
    queryKey: ['issue', id],
    queryFn: () => issuesRepository.getIssueById(id),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
  });

  const createIssueMutation = useMutation({
    mutationFn: issuesRepository.createIssue,
    onSuccess: () => {
      toast.success('Issue reported successfully');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to report issue');
    },
  });

  const updateIssueMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIssueDto }) => 
      issuesRepository.updateIssue(id, data),
    onSuccess: (issue) => {
      toast.success('Issue updated successfully');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['issue', issue.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update issue');
    },
  });

  const deleteIssueMutation = useMutation({
    mutationFn: issuesRepository.deleteIssue,
    onSuccess: () => {
      toast.success('Issue deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete issue');
    },
  });

  const assignIssueMutation = useMutation({
    mutationFn: ({ id, technicianId }: { id: string; technicianId: string }) => 
      issuesRepository.assignIssue(id, technicianId),
    onSuccess: (issue) => {
      toast.success('Issue assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['issue', issue.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to assign issue');
    },
  });

  return {
    issues: issuesQuery.data?.items || [],
    total: issuesQuery.data?.total || 0,
    isLoading: issuesQuery.isLoading,
    isFetching: issuesQuery.isFetching,
    refetch: issuesQuery.refetch,
    
    useIssue: issueQuery,
    
    createIssue: createIssueMutation.mutateAsync,
    isCreating: createIssueMutation.isPending,
    
    updateIssue: updateIssueMutation.mutateAsync,
    isUpdating: updateIssueMutation.isPending,
    
    deleteIssue: deleteIssueMutation.mutateAsync,
    isDeleting: deleteIssueMutation.isPending,
    
    assignIssue: assignIssueMutation.mutateAsync,
    isAssigning: assignIssueMutation.isPending,
  };
};

export const useCreateIssue = () => {
  const { createIssue, isCreating } = useIssues();
  return { mutateAsync: createIssue, isPending: isCreating };
};

export const useUpdateIssue = () => {
  const { updateIssue, isUpdating } = useIssues();
  return { mutateAsync: updateIssue, isPending: isUpdating };
};

export const useDeleteIssue = () => {
  const { deleteIssue, isDeleting } = useIssues();
  return { mutateAsync: deleteIssue, isPending: isDeleting };
};

export const useIssue = (id: string) => {
  const { issues } = useIssues();
  const issue = issues.find(i => i.id === id);
  return { data: issue, isLoading: false }; // Simplified for now
};
