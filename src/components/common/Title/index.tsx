import React from 'react';
import { Typography } from 'antd';
import { Title } from './title.interface';

const TitleComponent = Typography.Title;

export default function TypographyTitle({ level, style, children }: Title) {
  return (
    <TitleComponent level={level} style={{ marginTop: '0px', marginBottom: '0px', ...style }}>
      {children}
    </TitleComponent>
  );
}
