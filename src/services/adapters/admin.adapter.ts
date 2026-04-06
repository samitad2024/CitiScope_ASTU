import { User } from '../../types/user.types';

export const adminAdapter = {
  toUser: (data: any): User => {
    return {
      ...data,
      // Any transformation logic here
    };
  },
  
  toUserList: (data: any[]): User[] => {
    return data.map(adminAdapter.toUser);
  },
};
