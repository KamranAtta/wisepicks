import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchBar from '.';
export default {
  title: 'Search',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar />;

export const Search = Template.bind({});
Search.args = {
  value: '',
  disabled: false,
  placeholder: '',
};
