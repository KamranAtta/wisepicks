import React from 'react';
import { Button, ButtonProps } from 'antd';

export default function ButtonComponent({
  type,
  shape,
  icon,
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <Button type={type} shape={shape} icon={icon} {...otherProps}>
      {children}
    </Button>
  );
}

ButtonComponent.defaultProps = {
  type: 'default',
  shape: 'default',
  icon: <></>,
  children: <></>,
};
