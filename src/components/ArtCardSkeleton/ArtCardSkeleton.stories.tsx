import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArtCardSkeleton } from './ArtCardSkeleton';
import { artCardSkeletonPropsMocked } from './ArtCardSkeleton.mock';

export default {
  title: 'components/ArtCardSkeleton',
  component: ArtCardSkeleton,
} as ComponentMeta<typeof ArtCardSkeleton>;

const Template: ComponentStory<typeof ArtCardSkeleton> = (args) => (
  <>
    <ArtCardSkeleton {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = artCardSkeletonPropsMocked;
