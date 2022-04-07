import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loader } from './Loader';
import { loaderPropsMocked } from './Loader.mock';

export default {
  title: 'components/Loader',
  component: Loader,
  argTypes: {
    variant: {
      options: ['primary', 'gray50'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Loader {...args} />
  </div>
);
export const Default = Template.bind({});

Default.args = loaderPropsMocked;
