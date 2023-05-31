import { Dropdown, Button } from 'antd';
import propsInterface from './interface';

export default function MenuDropDown(props: propsInterface) {
  return (
    <Dropdown menu={{ items: props.items }} placement={props.placement}>
      {props.children}
    </Dropdown>
  );
}

MenuDropDown.defaultProps = {
  items: [
    {
      key: '1',
      label: <Button>Over Allocated</Button>,
    },
    {
      key: '2',
      label: <Button>Under Allocated</Button>,
    },
    {
      key: '3',
      label: <Button>Normal</Button>,
    },
  ],
  placement: 'bottom',
  children: <Button>Bar</Button>,
};
