import { Dispatch, SetStateAction } from 'react';

export default interface propsInterface {
  title: string;
  open: boolean;
  onClose(): void;
  setClientFormOpen: Dispatch<SetStateAction<boolean>>;
  setAlertBoxState: Dispatch<SetStateAction<{ message: any; type: any }>>;
  setClients: Dispatch<SetStateAction<[]>>;
  clients: [];
}
