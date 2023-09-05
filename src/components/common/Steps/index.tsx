import { Steps, StepsProps } from 'antd';

export default function StepsComponent({ direction, current, items, ...otherProps }: StepsProps) {
  return <Steps direction={direction} current={current} items={items} {...otherProps} />;
}

StepsComponent.defaultProps = {
  direction: 'vertical',
  current: '1',
};
