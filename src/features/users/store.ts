import { create } from 'zustand';
import { User } from '../../types';

interface UsersState {
  users: User[];
  setUsers: (users: User[]) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  selectedUserId: null,
  setSelectedUserId: (id) => set({ selectedUserId: id }),
}));
