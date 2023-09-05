export interface SortedResourcesProjectsInterface {
  project_name: string | null;
  project_id: string | null;
  fte: number | null;
}
export interface SortedResourcesInterface {
  availability: string;
  assigned_level: string;
  name: string;
  resource_id: string;
  team_name: string[];
  projects: SortedResourcesProjectsInterface[];
}
