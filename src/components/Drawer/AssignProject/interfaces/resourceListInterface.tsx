import vacationTableInterface from './vacationTableInterface';

export interface resourceListDataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  team: string;
  level: string;
  joiningDate: string;
  assignedProjects: string[];
  type: string;
  status: string;
  vacations: vacationTableInterface[];
}
