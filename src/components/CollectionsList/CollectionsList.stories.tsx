import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CollectionsList } from './CollectionsList';
import { collectionsListPropsMocked } from './CollectionsList.mock';

export default {
  title: 'components/CollectionsList',
  component: CollectionsList,
} as ComponentMeta<typeof CollectionsList>;

const Template: ComponentStory<typeof CollectionsList> = (args) => (
  <>
    <CollectionsList {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = collectionsListPropsMocked;
