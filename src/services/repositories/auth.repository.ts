import { authApi } from '../api/auth.api';
import { setTokens, clearTokens } from '../api/axios';
import { LoginResponse, AuthTokens } from '../../types/auth.types';
import { UserProfile } from '../../types/user.types';
import { authAdapter } from '../adapters/auth.adapter';

export const authRepository = {
  login: async (credentials: any): Promise<UserProfile> => {
    const response = await authApi.login(credentials);
    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens({ accessToken, refreshToken });
      return authAdapter.toUserProfile(response.data);
    }
    throw new Error(response.message || 'Login failed');
  },

  logout: async (): Promise<void> => {
    try {
      await authApi.logout();
    } finally {
      clearTokens();
    }
  },

  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await authApi.getCurrentUser();
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch user');
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await authApi.updateProfile(profile);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update profile');
  },
};
