import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StarIcon } from 'assets/icons/icons';
import { Text } from 'components/Typography';

import { Button } from './Button';
import { buttonPropsMocked } from './Button.mock';

export default {
  title: 'basic-components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Text>Buttons</Text>
      <Button {...args}>Button</Button>
      <Button {...args} endAdornment={<StarIcon />}>Button</Button>
      <Button {...args} startAdornment={<StarIcon />}>Button</Button>
      <Button {...args} endAdornment={<StarIcon />} startAdornment={<StarIcon />}>Button</Button>
      <Button {...args} disabled>Button</Button>
      <Button {...args} startAdornment={<StarIcon />} disabled>Button</Button>
      Link
      <Button {...args} to="/profile">Button</Button>
      Anchor
      <Button {...args} href="https://google.com">Button</Button>
    </div>
  </div>
);
export const Default = Template.bind({});

Default.args = buttonPropsMocked;
