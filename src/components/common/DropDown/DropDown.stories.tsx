import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonComponent from '../Button';
import MenuDropDown from '.';
export default {
  title: 'Dropdown',
  component: MenuDropDown,
} as ComponentMeta<typeof MenuDropDown>;

const Template: ComponentStory<typeof MenuDropDown> = (args) => <MenuDropDown {...args} />;

export const Dropdown = Template.bind({});
Dropdown.args = {
  items: [
    {
      key: '1',
      label: <ButtonComponent>Over Allocated</ButtonComponent>,
    },
    {
      key: '2',
      label: <ButtonComponent>Under Allocated</ButtonComponent>,
    },
    {
      key: '3',
      label: <ButtonComponent>Normal</ButtonComponent>,
    },
  ],
  placement: 'bottom',
  children: <ButtonComponent>Bar</ButtonComponent>,
};
