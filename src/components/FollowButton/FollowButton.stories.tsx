import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FollowButton } from './FollowButton';
import { followButtonPropsMocked } from './FollowButton.mock';

export default {
  title: 'components/FollowButton',
  component: FollowButton,
} as ComponentMeta<typeof FollowButton>;

const Template: ComponentStory<typeof FollowButton> = (args) => (
  <>
    <FollowButton {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = followButtonPropsMocked;
