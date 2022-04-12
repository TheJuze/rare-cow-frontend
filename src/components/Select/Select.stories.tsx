import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';
import { selectPropsMocked } from './Select.mock';

export default {
  title: 'basic-components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <div style={{ padding: '50px' }}>
    <Select {...args} />
  </div>
);
export const Default = Template.bind({});

Default.args = selectPropsMocked;
