import axiosInstance from './axios';
import { ApiResponse } from '../../types/api.types';
import { LoginResponse, AuthTokens } from '../../types/auth.types';
import { UserProfile } from '../../types/user.types';

export const authApi = {
  login: async (credentials: any): Promise<ApiResponse<LoginResponse>> => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.post<ApiResponse<void>>('/auth/logout');
    return data;
  },

  getCurrentUser: async (): Promise<ApiResponse<UserProfile>> => {
    const { data } = await axiosInstance.get<ApiResponse<UserProfile>>('/auth/me');
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
    return data;
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>('/auth/profile', profile);
    return data;
  },
};
