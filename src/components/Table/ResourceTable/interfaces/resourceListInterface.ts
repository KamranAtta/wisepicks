import { columnsSort } from '../../utils';
import { ColumnsType } from 'antd/es/table';
import vacationTableInterface from './vacationTableInterface';
export const vacationInterface: ColumnsType<vacationTableInterface> = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => columnsSort(a.type, b.type),
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: (a, b) => columnsSort(a.startDate, b.startDate),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    sorter: (a, b) => columnsSort(a.endDate, b.endDate),
  },
];
export interface resourceListDataType {
  projects: unknown[];
  skill_ids: any;
  key: string;
  name: string;
  email: string;
  phone: string;
  team: string;
  level: string;
  joiningDate: string;
  assignedProjects: string[];
  type: string;
  status: string;
  vacations: vacationTableInterface[];
}
