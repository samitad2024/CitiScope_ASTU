import axiosInstance from './axios';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';
import { User, UserRole } from '../../types/user.types';

export const adminApi = {
  getUsers: async (params?: any): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<User>>>('/admin/users', { params });
    return data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.get<ApiResponse<User>>(`/admin/users/${id}`);
    return data;
  },

  createUser: async (user: Partial<User>): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.post<ApiResponse<User>>('/admin/users', user);
    return data;
  },

  updateUser: async (id: string, user: Partial<User>): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.patch<ApiResponse<User>>(`/admin/users/${id}`, user);
    return data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.delete<ApiResponse<void>>(`/admin/users/${id}`);
    return data;
  },

  getAuditLogs: async (params?: any): Promise<ApiResponse<PaginatedResponse<any>>> => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<any>>>('/admin/audit-logs', { params });
    return data;
  },
};
