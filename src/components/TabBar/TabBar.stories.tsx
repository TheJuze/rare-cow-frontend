import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  AboutMeIcon,
  BidedIcon,
  CollectionsIcon,
  FavoritesIcon,
  ForSaleIcon,
  OwnedIcon,
  SoldIcon,
} from 'assets/icons/icons';
import React, { useMemo } from 'react';
import { TBarOption } from 'types';

import { TabBar } from './TabBar';
import { tabBarPropsMocked } from './TabBar.mock';

export default {
  title: 'components/TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>;

const Template: ComponentStory<typeof TabBar> = () => {
  const Tabs = useMemo<TBarOption[]>(
    () => [
      {
        value: '/about-me',
        name: 'About me',
        icon: <AboutMeIcon className="tab-bar__wrapper__body-tab-icon" />,
      },
      {
        value: '/owned',
        name: 'Owned',
        icon: <OwnedIcon />,
      },
      {
        value: '/for-sale',
        name: 'For sale',
        icon: <ForSaleIcon />,
      },
      {
        value: '/bided',
        name: 'Bided',
        icon: <BidedIcon />,
      },
      {
        value: '/favorites',
        name: 'Favorites',
        icon: <FavoritesIcon />,
      },
      {
        value: '/collections',
        name: 'Collections',
        icon: <CollectionsIcon />,
      },
      {
        value: '/sold',
        name: 'Sold',
        icon: <SoldIcon />,
      },
    ],
    [],
  );
  return (
    <>
      <TabBar options={Tabs} rootPath="" align="vertical" />
      <TabBar options={Tabs} rootPath="" align="horizontal" />
    </>
  );
};
export const Default = Template.bind({});

Default.args = tabBarPropsMocked;
