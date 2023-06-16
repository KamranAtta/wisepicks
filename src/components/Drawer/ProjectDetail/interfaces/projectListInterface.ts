import ResourcesInterface from '../../../Steps/interfaces/resourceInterface';

export interface ProjectListDataType {
  key: string;
  id: number;
  name: string;
  client: { id: number; name: string };
  plannedResources: number;
  allocatedResources: number;
  plannedHours: number;
  allocatedHours: number;
  start_date: string;
  end_date: string;
  expected_start_date: string;
  expected_end_date: string;
  type: string;
  status: string;
  technologies: string[];
  resources: ResourcesInterface[];
}
