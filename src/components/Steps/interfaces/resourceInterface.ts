export default interface ResourcesInterface {
  key: string;
  id: number;
  name: string;
  team: string;
  level: string;
  startDate: string;
  endDate: string;
  hoursPerWeek: number;
  currentProjects: string[];
  assignedProjects: string[];
  type: string;
  vacations: object[];
}
