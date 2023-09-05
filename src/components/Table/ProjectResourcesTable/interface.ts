export default interface ProjectResourcesInterface {
  key: string;
  name: string;
  // email: string;
  // phone: string;
  team: string;
  level: string;
  joiningDate: string;
  assignedProjects: string[];
  type: string;
  status: string;
}

export interface ProjectResourceQueryI {
  query: string;
  status: string;
}
export interface ProjectResourceTableI {
  resourceQuery: ProjectResourceQueryI;
}
