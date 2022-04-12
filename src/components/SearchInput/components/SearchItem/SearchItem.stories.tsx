import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchItem } from './SearchItem';
import { searchItemPropsMocked } from './SearchItem.mock';

export default {
  title: 'components/SearchItem',
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: ComponentStory<typeof SearchItem> = (args) => {
  return (
    <div style={{ margin: '40px auto' }}>
      <SearchItem {...args} />
    </div>
  );
};
export const Default = Template.bind({});

Default.args = searchItemPropsMocked;
