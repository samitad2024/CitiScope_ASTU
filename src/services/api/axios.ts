import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../../config/env';
import { AuthTokens } from '../../types/auth.types';
import { ApiResponse } from '../../types/api.types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get tokens from localStorage
const getTokens = (): AuthTokens | null => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
};

// Helper to set tokens to localStorage
const setTokens = (tokens: AuthTokens) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Helper to clear tokens from localStorage
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens();
    if (tokens && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh and global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401: Unauthorized (Access Token Expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getTokens();

      if (tokens?.refreshToken) {
        try {
          // Attempt to refresh token
          const { data } = await axios.post<ApiResponse<AuthTokens>>(`${env.API_URL}/auth/refresh`, {
            refreshToken: tokens.refreshToken,
          });

          if (data.success && data.data) {
            setTokens(data.data);
            
            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
            }
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, logout user
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, logout user
        clearTokens();
        window.location.href = '/login';
      }
    }

    // Global error handling (can be handled by TanStack Query as well)
    const apiError = error.response?.data as ApiResponse<any> | undefined;
    const errorMessage = apiError?.message || error.message || 'An unexpected error occurred';
    
    // You could trigger a global toast here if needed, but usually hooks handle this
    console.error(`[API Error] ${errorMessage}`, error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { setTokens, clearTokens, getTokens };
