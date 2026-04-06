import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserRole } from '../types/user.types';
import { AuthState } from '../types/auth.types';
import { getTokens, clearTokens } from '../services/api/axios';

interface AuthStore extends AuthState {
  role: UserRole | null;
  setUser: (user: UserProfile | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  initialize: () => void;
  loginAsRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      role: null,

      setUser: (user) => set({ user, isAuthenticated: !!user, role: user?.role || null }),
      
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      logout: () => {
        clearTokens();
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, role: null });
      },

      initialize: () => {
        const tokens = getTokens();
        if (tokens) {
          set({ 
            accessToken: tokens.accessToken, 
            refreshToken: tokens.refreshToken, 
            isAuthenticated: true 
          });
        }
      },

      loginAsRole: (role) => set({ role, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
