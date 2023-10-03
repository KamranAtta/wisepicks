export interface projectListDataType {
  key: string;
  id: number;
  name: string;
  client: any;
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
  projectResources: object[];
  projectPlannedResources: object[];
}
