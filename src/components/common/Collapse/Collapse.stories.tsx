import { ComponentStory, ComponentMeta } from '@storybook/react';
import CollapseComponent from '.';
import PanelComponent from '../Panel';
export default {
  title: 'Collapse',
  component: CollapseComponent,
} as ComponentMeta<typeof CollapseComponent>;

const Template: ComponentStory<typeof CollapseComponent> = (args) => (
  <CollapseComponent {...args} />
);

export const Collapse = Template.bind({});
Collapse.args = {
  children: (
    <>
      <PanelComponent header={'Panel'} key={1}></PanelComponent>
    </>
  ),
};
