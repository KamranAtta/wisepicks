/**
 * Import then exports all apis from here
 * Api files divided on the basis of entity, for each entity we have seperate file that contains all apis related
 */
import { getResources } from './resources.api';
import { getAllProjects } from './projects.api';
// File restructuring
import { requestResources } from './resources';
import { getTechnologies } from './technologies';
import { getClients, addClients } from './clients';
import {
  getProjectDetails,
  getProjectPlan,
  createProject,
  editProject,
  getProjects,
  getProjectLeads,
} from './projects';

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
