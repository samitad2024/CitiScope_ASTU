import { User } from '../../types';

export interface UserRepository {
  getUsers(currentUser?: User | null, filters?: Record<string, any>): Promise<User[]>;
  getUserById(id: string): Promise<User | undefined>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
