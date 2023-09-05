import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelComponent from '.';
export default {
  title: 'Panel',
  component: PanelComponent,
} as ComponentMeta<typeof PanelComponent>;

const Template: ComponentStory<typeof PanelComponent> = (args) => <PanelComponent {...args} />;

export const Panel = Template.bind({});
Panel.args = {
  header: 'This is panel header 1',
  key: '1',
};
