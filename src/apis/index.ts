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
} from './projects';
import { getClients, addClients } from './clients';
import { getTechnologies } from './technologies';
import { requestResources } from './resources';
import { getResources } from './resources.api';

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
};
