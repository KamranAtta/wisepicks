import { ComponentStory, ComponentMeta } from '@storybook/react';
import TypographyTitle from '.';
export default {
  title: 'Title',
  component: TypographyTitle,
} as ComponentMeta<typeof TypographyTitle>;

const Template: ComponentStory<typeof TypographyTitle> = (args) => <TypographyTitle {...args} />;

export const TitleArgs = Template.bind({});
TitleArgs.args = {
  children: <>Hello</>,
  level: 5,
};
