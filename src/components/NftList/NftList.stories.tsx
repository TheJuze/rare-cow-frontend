import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftList } from './NftList';
import { nftListPropsMocked } from './NftList.mock';

export default {
  title: 'components/NftList',
  component: NftList,
} as ComponentMeta<typeof NftList>;

const Template: ComponentStory<typeof NftList> = (args) => (
  <>
    <NftList {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = nftListPropsMocked;
