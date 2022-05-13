import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CollectionCard } from './CollectionCard';
import { collectionCardPropsMocked } from './CollectionCard.mock';

export default {
  title: 'components/CollectionCard',
  component: CollectionCard,
} as ComponentMeta<typeof CollectionCard>;

const Template: ComponentStory<typeof CollectionCard> = (args) => (
  <>
    <CollectionCard {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = collectionCardPropsMocked;
