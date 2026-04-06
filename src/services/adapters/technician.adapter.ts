import { Technician, TechnicianTask } from '../../types/technician.types';

export const technicianAdapter = {
  toTechnician: (data: any): Technician => {
    return {
      ...data,
      // Any transformation logic here
    };
  },
  
  toTechnicianList: (data: any[]): Technician[] => {
    return data.map(technicianAdapter.toTechnician);
  },
  
  toTask: (data: any): TechnicianTask => {
    return {
      ...data,
      // Any transformation logic here
    };
  },
  
  toTaskList: (data: any[]): TechnicianTask[] => {
    return data.map(technicianAdapter.toTask);
  },
};
