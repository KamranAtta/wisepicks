import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectDropDown from '.';
export default {
  title: 'Select',
  component: SelectDropDown,
} as ComponentMeta<typeof SelectDropDown>;

const Template: ComponentStory<typeof SelectDropDown> = (args) => <SelectDropDown {...args} />;

export const Select = Template.bind({});
Select.args = {
  placeholder: 'Select',
  options: [{ label: 'Label', value: 'Value' }],
};
