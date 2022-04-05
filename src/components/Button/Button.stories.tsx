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
  <div style={{ display: 'flex' }}>
    <div>
      <Text>Outlined button</Text>
      <Button {...args} endAdorment={<StarIcon />}>Button</Button>
      <Button {...args} startAdorment={<StarIcon />}>Button</Button>
      <Button {...args} endAdorment={<StarIcon />} startAdorment={<StarIcon />}>Button</Button>
      <Button {...args} disabled>Button</Button>
      <Button {...args} startAdorment={<StarIcon />} disabled>Button</Button>
      Link
      <Button {...args} to="/profile">Button</Button>
      Anchor
      <Button {...args} href="https://google.com">Button</Button>
    </div>
    <div>
      <Text>Filled button</Text>
      <Button variant="filled" {...args} endAdorment={<StarIcon />}>Button</Button>
      <Button variant="filled" {...args} startAdorment={<StarIcon />}>Button</Button>
      <Button variant="filled" {...args} endAdorment={<StarIcon />} startAdorment={<StarIcon />}>Button</Button>
      <Button variant="filled" {...args} disabled>Button</Button>
      <Button variant="filled" {...args} startAdorment={<StarIcon />} disabled>Button</Button>
    </div>
    <div>
      <Text>Text button</Text>
      <Button variant="text" {...args}>Button</Button>
      <Button variant="text" {...args} disabled>Button</Button>
    </div>
  </div>
);
export const Default = Template.bind({});

Default.args = buttonPropsMocked;
