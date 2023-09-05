import DrawerComponent from '../../common/Drawer';
import propsInterface from './interface';
export default function HeaderDrawerComponent({ title, children }: propsInterface) {
  return <DrawerComponent title={title}>{children}</DrawerComponent>;
}
