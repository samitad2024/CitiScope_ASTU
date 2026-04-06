import { UserProfile } from '../../types/user.types';
import { LoginResponse } from '../../types/auth.types';

export const authAdapter = {
  toUserProfile: (data: LoginResponse): UserProfile => {
    return {
      ...data.user,
      // Any transformation logic here
    };
  },
};
