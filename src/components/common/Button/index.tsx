import React from 'react';

import { Button as AntDButton, ButtonProps } from 'antd';

export default function ButtonComponent({
  type,
  shape,
  icon,
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <AntDButton type={type} shape={shape} icon={icon} {...otherProps}>
      {children}
    </AntDButton>
  );
}

AntDButton.defaultProps = {
  type: 'default',
  shape: 'default',
  icon: <></>,
  children: <></>,
};
