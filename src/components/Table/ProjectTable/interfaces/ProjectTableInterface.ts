import { ResourceQuery } from './ResourceQueryInterface';
import { ProjectListDataType } from '../../../Drawer/ProjectDetail/interfaces/projectListInterface';

export interface ProjectTableI {
  resourceQuery: ResourceQuery;
  handleProjectDetail: (element: ProjectListDataType) => void;
}
