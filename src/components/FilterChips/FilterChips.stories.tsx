import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FilterChips } from './FilterChips';
import { filterChipsPropsMocked } from './FilterChips.mock';

export default {
  title: 'components/FilterChips',
  component: FilterChips,
} as ComponentMeta<typeof FilterChips>;

const Template: ComponentStory<typeof FilterChips> = (args) => (
  <>
    <FilterChips {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = filterChipsPropsMocked;
