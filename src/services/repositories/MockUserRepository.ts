import { User } from '../../types';
import { mockUsers } from '../mock';
import { UserRepository } from './UserRepository';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockUserRepository implements UserRepository {
  async getUsers(currentUser?: User | null, filters?: Record<string, any>): Promise<User[]> {
    console.log('MOCK: GET /api/users', currentUser?.role, filters);
    await delay(800);
    
    if (!currentUser) return [];
    
    let users = [...mockUsers];
    
    if (currentUser.role === 'regional_admin') {
      users = users.filter(user => user.region === currentUser.region);
    } else if (currentUser.role !== 'federal_admin') {
      return [];
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(search) || 
        user.email.toLowerCase().includes(search)
      );
    }

    if (filters?.role) {
      users = users.filter(user => user.role === filters.role);
    }

    if (filters?.status) {
      users = users.filter(user => user.status === filters.status);
    }
    
    return users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    console.log(`MOCK: GET /api/users/${id}`);
    await delay(500);
    return mockUsers.find((user) => user.id === id);
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    console.log('MOCK: POST /api/users', data);
    await delay(1000);
    const newUser: User = {
      ...data,
      id: `U${(mockUsers.length + 1).toString()}`,
    };
    mockUsers.push(newUser);
    return newUser;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    console.log(`MOCK: PUT /api/users/${id}`, data);
    await delay(800);
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    const updatedUser = {
      ...mockUsers[index],
      ...data,
    };
    mockUsers[index] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    console.log(`MOCK: DELETE /api/users/${id}`);
    await delay(600);
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
    }
  }
}
