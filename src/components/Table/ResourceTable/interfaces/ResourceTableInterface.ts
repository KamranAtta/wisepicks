import { resourceListDataType } from './resourceListInterface';
import { ResourceQuery } from './ResourceQueryInterface';

export interface ResourceTableI {
  resourceQuery: ResourceQuery;
  handleResourceDetail: (element: resourceListDataType) => void;
  handleAssignProject: (element: resourceListDataType) => void;
}
