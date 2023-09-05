import { Collapse, CollapsePanelProps } from 'antd';

const { Panel } = Collapse;

export default function PanelComponent({
  header,
  key,
  children,
  ...otherProps
}: CollapsePanelProps) {
  return (
    <Panel header={header} key={key} {...otherProps}>
      {children}
    </Panel>
  );
}

PanelComponent.defaultProps = {
  header: 'This is panel header 1',
  key: '1',
};
