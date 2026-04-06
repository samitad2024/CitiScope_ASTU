import { technicianApi } from '../api/technician.api';
import { Technician, TechnicianTask } from '../../types/technician.types';
import { PaginatedResponse } from '../../types/api.types';
import { technicianAdapter } from '../adapters/technician.adapter';

export const technicianRepository = {
  getTechnicians: async (params?: any): Promise<PaginatedResponse<Technician>> => {
    const response = await technicianApi.getTechnicians(params);
    if (response.success && response.data) {
      return {
        ...response.data,
        items: technicianAdapter.toTechnicianList(response.data.items),
      };
    }
    throw new Error(response.message || 'Failed to fetch technicians');
  },

  getTechnicianById: async (id: string): Promise<Technician> => {
    const response = await technicianApi.getTechnicianById(id);
    if (response.success && response.data) {
      return technicianAdapter.toTechnician(response.data);
    }
    throw new Error(response.message || 'Failed to fetch technician');
  },

  getTechnicianTasks: async (id: string, params?: any): Promise<PaginatedResponse<TechnicianTask>> => {
    const response = await technicianApi.getTechnicianTasks(id, params);
    if (response.success && response.data) {
      return {
        ...response.data,
        items: technicianAdapter.toTaskList(response.data.items),
      };
    }
    throw new Error(response.message || 'Failed to fetch technician tasks');
  },

  updateTaskStatus: async (taskId: string, status: string, notes?: string): Promise<TechnicianTask> => {
    const response = await technicianApi.updateTaskStatus(taskId, status, notes);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update task status');
  },

  updateLocation: async (id: string, latitude: number, longitude: number): Promise<void> => {
    const response = await technicianApi.updateLocation(id, latitude, longitude);
    if (!response.success) {
      throw new Error(response.message || 'Failed to update location');
    }
  },
};
