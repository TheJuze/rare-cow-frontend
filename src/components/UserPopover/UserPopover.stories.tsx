import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserPopover } from './UserPopover';
import { userPopoverPropsMocked } from './UserPopover.mock';

export default {
  title: 'components/UserPopover',
  component: UserPopover,
} as ComponentMeta<typeof UserPopover>;

const Template: ComponentStory<typeof UserPopover> = () => (
  <>
    <UserPopover {...userPopoverPropsMocked} />
  </>
);
export const Default = Template.bind({});

Default.args = userPopoverPropsMocked;
