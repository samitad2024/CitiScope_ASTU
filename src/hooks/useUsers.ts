import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../services/api/users';
import { toast } from 'sonner';
import { User } from '../types';
import { useAuthStore } from './useAuth';

export function useUsers(filters?: Record<string, any>) {
  const { user: currentUser } = useAuthStore();
  return useQuery({
    queryKey: ['users', filters, currentUser?.id],
    queryFn: () => getUsers(currentUser, filters),
    enabled: !!currentUser,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<User, 'id'>) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
      toast.success('User updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });
}
