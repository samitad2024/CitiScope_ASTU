export type UserRole = 'federal_admin' | 'regional_admin' | 'zonal_admin' | 'woreda_admin' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  region: string;
  zone: string;
  woreda: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  avatarUrl?: string;
  lastLogin?: string;
}
