import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authRepository } from '../services/repositories/auth.repository';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';

export { useAuthStore };

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, logout: clearAuthStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authRepository.login,
    onSuccess: (user) => {
      setUser(user);
      toast.success('Login successful');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authRepository.logout,
    onSuccess: () => {
      clearAuthStore();
      toast.success('Logged out successfully');
      queryClient.clear();
    },
  });

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: authRepository.getCurrentUser,
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    user: currentUserQuery.data,
    isLoadingUser: currentUserQuery.isLoading,
    refetchUser: currentUserQuery.refetch,
  };
};

export const useLogin = () => {
  const { login, isLoggingIn } = useAuth();
  return { login, isLoggingIn };
};

export const useLogout = () => {
  const { logout, isLoggingOut } = useAuth();
  return { logout, isLoggingOut };
};

export const useCurrentUser = () => {
  const { user, isLoadingUser, refetchUser } = useAuth();
  return { user, isLoadingUser, refetchUser };
};
