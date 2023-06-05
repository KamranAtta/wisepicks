import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepsComponent from '.';
export default {
  title: 'Steps',
  component: StepsComponent,
} as ComponentMeta<typeof StepsComponent>;

const Template: ComponentStory<typeof StepsComponent> = (args) => <StepsComponent {...args} />;

export const Steps = Template.bind({});
Steps.args = {
  direction: 'vertical',
  current: 1,
};
