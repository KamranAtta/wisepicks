import { ProjectQuery } from './ProjectQueryInterface';
import { ProjectListDataType } from '../../../Drawer/ProjectDetail/interfaces/projectListInterface';

export interface ProjectTableI {
  projectQuery: ProjectQuery;
  handleProjectDetail: (element: ProjectListDataType) => void;
}
