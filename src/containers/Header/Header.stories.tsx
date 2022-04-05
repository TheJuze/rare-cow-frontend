import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Header } from './Header';
import { headerPropsMocked } from './Header.mock';

export default {
  title: 'components/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <>
    <Header {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = headerPropsMocked;
