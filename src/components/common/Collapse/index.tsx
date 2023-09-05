import { Collapse, CollapseProps } from 'antd';

export default function CollapseComponent({ children, ...otherProps }: CollapseProps) {
  return <Collapse {...otherProps}>{children}</Collapse>;
}

CollapseComponent.defaultProps = {
  children: <></>,
};
