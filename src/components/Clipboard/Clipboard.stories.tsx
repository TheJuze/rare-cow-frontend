import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Clipboard from './Clipboard';
import { clipboardPropsMocked } from './Clipboard.mock';

export default {
  title: 'components/Clipboard',
  component: Clipboard,
} as ComponentMeta<typeof Clipboard>;

const Template: ComponentStory<typeof Clipboard> = (args) => (
  <>
    <Clipboard {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = clipboardPropsMocked;
