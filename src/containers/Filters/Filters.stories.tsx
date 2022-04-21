import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Filters } from './Filters';
import { filtersPropsMocked } from './Filters.mock';

export default {
  title: 'components/Filters',
  component: Filters,
} as ComponentMeta<typeof Filters>;

const Template: ComponentStory<typeof Filters> = (args) => (
  <>
    <Filters {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = filtersPropsMocked;
