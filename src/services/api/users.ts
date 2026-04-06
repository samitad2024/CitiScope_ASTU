import { User } from '../../types';
import { userRepository } from '../repositories';

export const getUsers = (currentUser?: User | null, filters?: Record<string, any>): Promise<User[]> => {
  return userRepository.getUsers(currentUser, filters);
};

export const getUserById = (id: string): Promise<User | undefined> => {
  return userRepository.getUserById(id);
};

export const createUser = (data: Omit<User, 'id'>): Promise<User> => {
  return userRepository.createUser(data);
};

export const updateUser = (id: string, data: Partial<User>): Promise<User> => {
  return userRepository.updateUser(id, data);
};

export const deleteUser = (id: string): Promise<void> => {
  return userRepository.deleteUser(id);
};
