export default interface ProjectResourcesInterface {
  key: string;
  name: string;
  fte: string;
  team: string;
  level: string;
  joiningDate: string;
  assignedProjects: string[];
  type: string;
  status: string;
  resourceId: string;
}

export default interface SuggestedEngineerInterface {
  resource_id: string;
  resource_name: string;
  team_name: string;
  assigned_level: string;
  total_fte: string;
  available_fte: string;
  selected: boolean;
  selectedPercentage: string;
  startDate: string;
}

export default interface SelectedEngineerInterface {
  plan_id: string;
  total_fte_requirement: string;
  resource_id: string;
  resource_name: string;
  team_name: string;
  assigned_level: string;
  total_fte: string;
  available_fte: string;
  selected: boolean;
  selectedPercentage: string;
  startDate: string;
}

export interface ProjectResourceQueryI {
  query: string;
  status: string;
}
export interface ProjectResourceTableI {
  resourceQuery: ProjectResourceQueryI;
}
