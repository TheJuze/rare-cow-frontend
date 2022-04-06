import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LikeButton } from './LikeButton';
import { likeButtonPropsMocked } from './LikeButton.mock';

export default {
  title: 'components/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (args) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <LikeButton {...args} />
  </div>
);
export const Default = Template.bind({});

Default.args = likeButtonPropsMocked;
