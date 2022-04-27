import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchCollection } from './SearchCollection';
import { searchCollectionPropsMocked } from './SearchCollection.mock';

export default {
  title: 'components/SearchCollection',
  component: SearchCollection,
} as ComponentMeta<typeof SearchCollection>;

const Template: ComponentStory<typeof SearchCollection> = (args) => (
  <>
    <SearchCollection {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = searchCollectionPropsMocked;
