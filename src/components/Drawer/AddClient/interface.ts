import { AlertProps } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export default interface propsInterface {
  title: string;
  open: boolean;
  onClose(): void;
  setClientFormOpen: Dispatch<SetStateAction<boolean>>;
  setAlertBoxState: Dispatch<SetStateAction<AlertProps>>;
  setClients: Dispatch<SetStateAction<[]>>;
  clients: [];
}
