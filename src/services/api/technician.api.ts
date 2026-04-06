import axiosInstance from './axios';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';
import { Technician, TechnicianTask } from '../../types/technician.types';

export const technicianApi = {
  getTechnicians: async (params?: any): Promise<ApiResponse<PaginatedResponse<Technician>>> => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Technician>>>('/technicians', { params });
    return data;
  },

  getTechnicianById: async (id: string): Promise<ApiResponse<Technician>> => {
    const { data } = await axiosInstance.get<ApiResponse<Technician>>(`/technicians/${id}`);
    return data;
  },

  getTechnicianTasks: async (id: string, params?: any): Promise<ApiResponse<PaginatedResponse<TechnicianTask>>> => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<TechnicianTask>>>(`/technicians/${id}/tasks`, { params });
    return data;
  },

  updateTaskStatus: async (taskId: string, status: string, notes?: string): Promise<ApiResponse<TechnicianTask>> => {
    const { data } = await axiosInstance.patch<ApiResponse<TechnicianTask>>(`/technicians/tasks/${taskId}/status`, { status, notes });
    return data;
  },

  updateLocation: async (id: string, latitude: number, longitude: number): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.post<ApiResponse<void>>(`/technicians/${id}/location`, { latitude, longitude });
    return data;
  },
};
