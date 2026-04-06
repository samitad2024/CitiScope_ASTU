import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationStore } from '../store/notification.store';
import axiosInstance from '../services/api/axios';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { Notification } from '../store/notification.store';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const notificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Notification>>>('/notifications');
      if (data.success && data.data) {
        return data.data;
      }
      throw new Error(data.message || 'Failed to fetch notifications');
    },
    staleTime: 1000 * 60, // 1 minute
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.patch<ApiResponse<void>>(`/notifications/${id}/read`);
      if (!data.success) {
        throw new Error(data.message || 'Failed to mark as read');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post<ApiResponse<void>>('/notifications/read-all');
      if (!data.success) {
        throw new Error(data.message || 'Failed to mark all as read');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notifications: notificationsQuery.data?.items || [],
    total: notificationsQuery.data?.total || 0,
    isLoading: notificationsQuery.isLoading,
    refetch: notificationsQuery.refetch,
    
    markAsRead: markAsReadMutation.mutateAsync,
    isMarkingAsRead: markAsReadMutation.isPending,
    
    markAllAsRead: markAllAsReadMutation.mutateAsync,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
  };
};
