import { ComponentMeta, ComponentStory } from '@storybook/react';

import { profileAvatar, nullAvatar } from 'assets/img';
import { Avatar } from './Avatar';
import { avatarPropsMocked } from './Avatar.mock';

export default {
  title: 'components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = () => (
  <div style={{ padding: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      <Avatar id={0} avatar={nullAvatar} size={112} />
      <div style={{ marginLeft: 16 }}>
        <Avatar id={0} avatar={nullAvatar} size={30} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar id={1} avatar={profileAvatar} size={112} />
      <div style={{ marginLeft: 16 }}>
        <Avatar id={1} avatar={profileAvatar} size={30} />
      </div>
    </div>
  </div>
);
export const Default = Template.bind({});

Default.args = avatarPropsMocked;
