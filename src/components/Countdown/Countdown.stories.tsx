import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Countdown } from './Countdown';
import { countdownPropsMocked } from './Countdown.mock';

export default {
  title: 'components/Countdown',
  component: Countdown,
} as ComponentMeta<typeof Countdown>;

const Template: ComponentStory<typeof Countdown> = (args) => (
  <>
    <Countdown {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = countdownPropsMocked;
