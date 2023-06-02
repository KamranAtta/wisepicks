export interface ProjectListDataType {
  key: string;
  id: number;
  name: string;
  client: string;
  plannedResources: number;
  allocatedResources: number;
  plannedHours: number;
  allocatedHours: number;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  technologies: string[];
  resources: object[];
}
