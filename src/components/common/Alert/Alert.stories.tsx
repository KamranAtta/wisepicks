import AlertBox from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  title: 'Alert',
  component: AlertBox,
} as ComponentMeta<typeof AlertBox>;

const Template: ComponentStory<typeof AlertBox> = (args) => <AlertBox {...args} />;

// Types
export const AlertSuccess = Template.bind({});
AlertSuccess.args = {
  message: 'success',
  type: 'success',
};
export const AlertError = Template.bind({});
AlertError.args = {
  message: 'error',
  type: 'error',
};
export const AlertInfo = Template.bind({});
AlertInfo.args = {
  message: 'info',
  type: 'info',
};
export const AlertWarning = Template.bind({});
AlertWarning.args = {
  message: 'warning',
  type: 'warning',
};
