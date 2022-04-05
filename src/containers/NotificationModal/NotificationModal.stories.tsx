import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotificationModal } from './NotificationModal';
import { notificationModalPropsMocked } from './NotificationModal.mock';

export default {
  title: 'components/NotificationModal',
  component: NotificationModal,
} as ComponentMeta<typeof NotificationModal>;

const Template: ComponentStory<typeof NotificationModal> = (args) => (
  <>
    <NotificationModal {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = notificationModalPropsMocked;
