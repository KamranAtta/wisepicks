import { ProjectListDataType } from './projectListInterface';

export default interface propsInterface {
  title: string;
  data: ProjectListDataType;
  open: boolean;
  onClose(): void;
}
