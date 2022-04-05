import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tooltip } from './Tooltip';
import { tooltipPropsMocked } from './Tooltip.mock';

export default {
  title: 'basic-components/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <>
    <Tooltip {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = tooltipPropsMocked;
