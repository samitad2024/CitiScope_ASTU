import { User } from '../../types';
import { apiClient } from '../../lib/api-client';
import { UserRepository } from './UserRepository';

export class HttpUserRepository implements UserRepository {
  async getUsers(currentUser?: User | null, filters?: Record<string, any>): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users', { params: filters });
    return response.data;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await apiClient.post<User>('/users', user);
    return response.data;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
