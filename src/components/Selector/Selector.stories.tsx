import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Selector } from './Selector';
import { selectorPropsMocked } from './Selector.mock';

export default {
  title: 'components/Selector',
  component: Selector,
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args) => (
  <>
    <Selector {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = selectorPropsMocked;
