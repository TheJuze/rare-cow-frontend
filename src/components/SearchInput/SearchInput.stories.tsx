import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchInput } from './SearchInput';
import { searchInputPropsMocked } from './SearchInput.mock';

export default {
  title: 'components/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <>
    <SearchInput {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = searchInputPropsMocked;
