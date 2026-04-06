import { useQuery } from '@tanstack/react-query';
import { issuesRepository } from '../services/repositories/issues.repository';
import { adminRepository } from '../services/repositories/admin.repository';

export const useDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: issuesRepository.getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const recentIssuesQuery = useQuery({
    queryKey: ['recentIssues'],
    queryFn: () => issuesRepository.getIssues({ pageSize: 5, sort: 'createdAt:desc' }),
    staleTime: 1000 * 60, // 1 minute
  });

  const auditLogsQuery = useQuery({
    queryKey: ['auditLogs'],
    queryFn: () => adminRepository.getAuditLogs({ pageSize: 10, sort: 'createdAt:desc' }),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    stats: statsQuery.data,
    isLoadingStats: statsQuery.isLoading,
    refetchStats: statsQuery.refetch,
    
    recentIssues: recentIssuesQuery.data?.items || [],
    isLoadingRecentIssues: recentIssuesQuery.isLoading,
    
    auditLogs: auditLogsQuery.data?.items || [],
    isLoadingAuditLogs: auditLogsQuery.isLoading,
  };
};
