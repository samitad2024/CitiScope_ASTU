import { adminApi } from '../api/admin.api';
import { User } from '../../types/user.types';
import { PaginatedResponse } from '../../types/api.types';
import { adminAdapter } from '../adapters/admin.adapter';

export const adminRepository = {
  getUsers: async (params?: any): Promise<PaginatedResponse<User>> => {
    const response = await adminApi.getUsers(params);
    if (response.success && response.data) {
      return {
        ...response.data,
        items: adminAdapter.toUserList(response.data.items),
      };
    }
    throw new Error(response.message || 'Failed to fetch users');
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await adminApi.getUserById(id);
    if (response.success && response.data) {
      return adminAdapter.toUser(response.data);
    }
    throw new Error(response.message || 'Failed to fetch user');
  },

  createUser: async (user: Partial<User>): Promise<User> => {
    const response = await adminApi.createUser(user);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create user');
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await adminApi.updateUser(id, user);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update user');
  },

  deleteUser: async (id: string): Promise<void> => {
    const response = await adminApi.deleteUser(id);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete user');
    }
  },

  getAuditLogs: async (params?: any): Promise<PaginatedResponse<any>> => {
    const response = await adminApi.getAuditLogs(params);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch audit logs');
  },
};
