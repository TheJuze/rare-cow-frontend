import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Listing } from './Listing';
import { listingPropsMocked } from './Listing.mock';

export default {
  title: 'components/Listing',
  component: Listing,
} as ComponentMeta<typeof Listing>;

const Template: ComponentStory<typeof Listing> = (args) => (
  <>
    <Listing {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = listingPropsMocked;
