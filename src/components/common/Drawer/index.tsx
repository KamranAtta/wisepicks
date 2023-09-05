import { Drawer as DrawerComponent, DrawerProps } from 'antd';

export default function Drawer({
  title,
  placement,
  open,
  onClose,
  children,
  bodyStyle,
  ...otherProps
}: DrawerProps) {
  return (
    <DrawerComponent
      bodyStyle={bodyStyle}
      title={title}
      placement={placement}
      onClose={onClose}
      open={open}
      {...otherProps}
    >
      {children}
    </DrawerComponent>
  );
}

Drawer.defaultProps = {
  type: 'Sample Drawer',
  placement: 'right',
  onClose: false,
  open: true,
  children: <></>,
  bodyStyle: { padding: 0 },
};
