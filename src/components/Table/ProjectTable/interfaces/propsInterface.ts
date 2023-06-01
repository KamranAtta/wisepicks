import { projectListDataType } from './projectListInterface';

export default interface propsInterface {
  title: string;
  data: projectListDataType;
  open: boolean;
  onClose(): void;
}
