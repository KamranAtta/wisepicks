import { Dispatch, SetStateAction } from 'react';
import { client } from '../../Form/interfaces/clientInterface';
export default interface propsInterface {
  title: string;
  open: boolean;
  onClose(): void;
  setClientFormOpen: Dispatch<SetStateAction<boolean>>;
  setClients: Dispatch<SetStateAction<client[]>>;
  clients: client[];
}
