import { MenuProps } from 'antd';
import React from 'react';
export default interface propsInterface {
  items: MenuProps['items'];
  placement:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'top'
    | 'bottom'
    | undefined;
  children: React.ReactNode;
}
