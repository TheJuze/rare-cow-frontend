import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Chips } from './Chips';
import { chipsPropsMocked } from './Chips.mock';

export default {
  title: 'components/Chips',
  component: Chips,
} as ComponentMeta<typeof Chips>;

const Template: ComponentStory<typeof Chips> = (args) => (
  <>
    <Chips {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = chipsPropsMocked;
