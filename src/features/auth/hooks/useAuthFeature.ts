import { useAuth } from '../../../hooks/useAuth';
import { useAuthStore } from '../../../store/auth.store';

export const useAuthFeature = () => {
  const auth = useAuth();
  const { user, isAuthenticated } = useAuthStore();

  return {
    ...auth,
    user,
    isAuthenticated,
  };
};
