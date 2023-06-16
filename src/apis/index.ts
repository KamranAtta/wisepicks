/**
 * Import then exports all apis from here
 * Api files divided on the basis of entity, for each entity we have seperate file that contains all apis related
 */
import {
  getProjectDetails,
  getProjectPlan,
  createProject,
  editProject,
  getProjects,
  getAllProjects,
  getProjectLeads,
} from './projects.api';
import { getTechnologies } from './technologies.api';
import { getClients, addClients } from './clients.api';
import { getResources, requestResources, deleteResource } from './resources.api';
import { getSkills } from './skills.api';
import { getTeams } from './teams.api';
export {
  getResources,
  getProjectDetails,
  getProjectPlan,
  createProject,
  editProject,
  getProjects,
  getAllProjects,
  getProjectLeads,
  getClients,
  addClients,
  getTechnologies,
  requestResources,
  deleteResource,
  getSkills,
  getTeams,
};
