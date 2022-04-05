import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StarIcon } from 'assets/icons/icons';
import { Text } from 'components/Typography';

import { Button } from './Button';
import { buttonPropsMocked } from './Button.mock';

export default {
  title: 'basic-components/IconButton',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ display: 'flex' }}>
    <div>
      <Text>Outlined icon button</Text>
      <Button {...args} icon={<StarIcon />}>Button</Button>
      <Button {...args} icon={<StarIcon />} disabled>Button</Button>
      Link
      <Button {...args} icon={<StarIcon />} to="/profile">Button</Button>
      Anchor
      <Button {...args} icon={<StarIcon />} href="https://google.com">Button</Button>
    </div>
    <div>
      <Text>Outlined secondaty button</Text>
      <Button {...args} variant="outlined-secondary" icon={<StarIcon />}>Button</Button>
      <Button {...args} variant="outlined-secondary" icon={<StarIcon />} disabled>Button</Button>
      Link
      <Button {...args} variant="outlined-secondary" icon={<StarIcon />} to="/profile">Button</Button>
      Anchor
      <Button {...args} variant="outlined-secondary" icon={<StarIcon />} href="https://google.com">Button</Button>
    </div>
    <div>
      <Text>Filled icon button</Text>
      <Button variant="filled" {...args} icon={<StarIcon />}>Button</Button>
      <Button variant="filled" {...args} disabled icon={<StarIcon />}>Button</Button>
      Link
      <Button {...args} variant="filled" icon={<StarIcon />} to="/profile">Button</Button>
      Anchor
      <Button {...args} variant="filled" icon={<StarIcon />} href="https://google.com">Button</Button>
    </div>
  </div>
);
export const Default = Template.bind({});

Default.args = buttonPropsMocked;
