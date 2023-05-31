import { Drawer, DrawerProps } from 'antd';

export default function DrawerComponent({
  title,
  placement,
  open,
  onClose,
  children,
  ...otherProps
}: DrawerProps) {
  return (
    <Drawer title={title} placement={placement} onClose={onClose} open={open} {...otherProps}>
      {children}
    </Drawer>
  );
}

DrawerComponent.defaultProps = {
  type: 'Sample Drawer',
  placement: 'right',
  onClose: false,
  open: true,
  children: <></>,
};
