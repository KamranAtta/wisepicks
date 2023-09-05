import { ComponentStory, ComponentMeta } from '@storybook/react';
import DrawerComponent from '.';
export default {
  title: 'Drawer',
  component: DrawerComponent,
} as ComponentMeta<typeof DrawerComponent>;

const Template: ComponentStory<typeof DrawerComponent> = (args) => <DrawerComponent {...args} />;

export const Drawer = Template.bind({});
Drawer.args = {
  placement: 'right',
  open: true,
  children: <></>,
};
