import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BurnButton } from './BurnButton';
import { burnButtonPropsMocked } from './BurnButton.mock';

export default {
  title: 'components/BurnButton',
  component: BurnButton,
} as ComponentMeta<typeof BurnButton>;

const Template: ComponentStory<typeof BurnButton> = (args) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <BurnButton {...args} />
  </div>
);
export const Default = Template.bind({});

Default.args = burnButtonPropsMocked;
