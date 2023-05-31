import { resourceListDataType } from './resourceListInterface';

export default interface propsInterface {
  title: string;
  data: resourceListDataType;
  open: boolean;
  onClose(): void;
}
