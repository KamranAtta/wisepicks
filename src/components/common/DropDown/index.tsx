import { Dropdown } from 'antd';
import propsInterface from './interface';

export default function MenuDropDown(props: propsInterface) {
  return (
    <Dropdown menu={{ items: props.items }} placement={props.placement}>
      {props.children}
    </Dropdown>
  );
}

MenuDropDown.defaultProps = {
  placement: 'bottom',
  children: <></>,
};
