import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './api';
import { User } from '../../types';
import { useAuthStore } from '../../hooks/useAuth';
import { useUsersStore } from './store';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useUsers = (filters?: Record<string, any>) => {
  const { user } = useAuthStore();
  const { setUsers } = useUsersStore();
  
  const query = useQuery({
    queryKey: ['users', user?.id, filters],
    queryFn: () => getUsers(user, filters),
    enabled: !!user,
  });

  useEffect(() => {
    if (query.data) {
      setUsers(query.data);
    }
  }, [query.data, setUsers]);

  return query;
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: Partial<User> }) => updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
};

export const useDeleteUser = () => {
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
};
