import { SearchOutlined } from '@ant-design/icons';
import ButtonComponent from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  title: 'Example/Button',
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />;

// Types
export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Primary Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: 'ghost',
  children: 'Ghost Button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  children: 'Link Button',
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  children: 'Text Button',
};

// Shapes
export const Circle = Template.bind({});
Circle.args = {
  shape: 'circle',
  type: 'primary',
  children: 'C',
};

export const Round = Template.bind({});
Round.args = {
  shape: 'round',
  type: 'primary',
  children: 'Round Button',
};

// Block
export const Block = Template.bind({});
Block.args = {
  block: true,
  type: 'primary',
  children: 'Block Button',
};

// Loading
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  type: 'primary',
  children: 'Loading Button',
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  type: 'primary',
  children: 'Disabled Button',
};

// Disabled
export const Danger = Template.bind({});
Danger.args = {
  danger: true,
  type: 'primary',
  children: 'Danger Button',
};

// Icon
export const IconButton = Template.bind({});
IconButton.args = {
  icon: <SearchOutlined />,
  type: 'primary',
  children: 'Search',
};

// Sizes
export const Small = Template.bind({});
Small.args = {
  size: 'small',
  type: 'primary',
  children: 'Small Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'middle',
  type: 'primary',
  children: 'Middle Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  type: 'primary',
  children: 'Large Button',
};
