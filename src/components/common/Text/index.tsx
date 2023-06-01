import React from 'react';
import { Typography } from 'antd';
import { Text } from './text.interface';

const TextComponent = Typography.Text;

export default function TypographyText({ style, children }: Text) {
  return (
    <TextComponent style={{ marginTop: '0px', marginBottom: '0px', ...style }}>
      {children}
    </TextComponent>
  );
}

TypographyText.defaultProps = {
  style: {},
};
