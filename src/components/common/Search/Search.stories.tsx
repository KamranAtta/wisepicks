import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchBar from '.';
export default {
  title: 'Search',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Search = Template.bind({});
Search.args = {
  value: '',
  disabled: false,
  placeholder: '',
};