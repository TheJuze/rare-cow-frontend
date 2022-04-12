import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HighlightedText } from './HighlightedText';
import { highlightedTextPropsMocked } from './HighlightedText.mock';

export default {
  title: 'components/HighlightedText',
  component: HighlightedText,
} as ComponentMeta<typeof HighlightedText>;

const Template: ComponentStory<typeof HighlightedText> = (args) => (
  <>
    <HighlightedText {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = highlightedTextPropsMocked;
