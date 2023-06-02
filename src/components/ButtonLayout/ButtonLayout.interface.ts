import { ButtonProps } from 'antd/lib/button';

export interface ButtonFlatList {
  children: string;
  props: ButtonProps;
}

export interface ButtonLayout {
  title: React.ReactNode;
  left: ButtonFlatList[];
  right: ButtonFlatList[];
}
