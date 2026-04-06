import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { technicianRepository } from '../services/repositories/technician.repository';
import { toast } from 'sonner';

export const useTechnician = (technicianId?: string) => {
  const queryClient = useQueryClient();

  const techniciansQuery = useQuery({
    queryKey: ['technicians'],
    queryFn: () => technicianRepository.getTechnicians(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const technicianQuery = useQuery({
    queryKey: ['technician', technicianId],
    queryFn: () => technicianRepository.getTechnicianById(technicianId!),
    enabled: !!technicianId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const tasksQuery = useQuery({
    queryKey: ['technicianTasks', technicianId],
    queryFn: () => technicianRepository.getTechnicianTasks(technicianId!),
    enabled: !!technicianId,
    staleTime: 1000 * 60, // 1 minute
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status, notes }: { taskId: string; status: string; notes?: string }) => 
      technicianRepository.updateTaskStatus(taskId, status, notes),
    onSuccess: (task) => {
      toast.success('Task status updated');
      queryClient.invalidateQueries({ queryKey: ['technicianTasks', technicianId] });
      queryClient.invalidateQueries({ queryKey: ['issue', task.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task status');
    },
  });

  const updateLocationMutation = useMutation({
    mutationFn: ({ latitude, longitude }: { latitude: number; longitude: number }) => 
      technicianRepository.updateLocation(technicianId!, latitude, longitude),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technician', technicianId] });
    },
    onError: (error: Error) => {
      console.error('Failed to update location', error);
    },
  });

  return {
    technicians: techniciansQuery.data?.items || [],
    isLoadingTechnicians: techniciansQuery.isLoading,
    
    technician: technicianQuery.data,
    isLoadingTechnician: technicianQuery.isLoading,
    
    tasks: tasksQuery.data?.items || [],
    isLoadingTasks: tasksQuery.isLoading,
    
    updateTaskStatus: updateTaskStatusMutation.mutateAsync,
    isUpdatingStatus: updateTaskStatusMutation.isPending,
    
    updateLocation: updateLocationMutation.mutateAsync,
    isUpdatingLocation: updateLocationMutation.isPending,
  };
};
