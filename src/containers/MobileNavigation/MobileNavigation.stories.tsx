import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MobileNavigation } from './MobileNavigation';
import { mobileNavigationPropsMocked } from './MobileNavigation.mock';

export default {
  title: 'components/MobileNavigation',
  component: MobileNavigation,
} as ComponentMeta<typeof MobileNavigation>;

const Template: ComponentStory<typeof MobileNavigation> = (args) => (
  <>
    <MobileNavigation {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = mobileNavigationPropsMocked;
