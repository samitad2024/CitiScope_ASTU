import { User } from './user.types';
import { Issue } from './issue.types';

export interface Technician extends User {
  specialization: string[];
  activeTasks: number;
  completedTasks: number;
  rating: number;
  location?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
}

export interface TechnicianTask extends Issue {
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  technicianNotes?: string;
}
