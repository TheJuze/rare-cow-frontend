import React from 'react';
import { useCallback, useState } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TOption } from 'types';

import { OptionSelector } from './OptionSelector';
import { optionSelectorPropsMocked } from './OptionSelector.mock';

export default {
  title: 'components/OptionSelector',
  component: OptionSelector,
} as ComponentMeta<typeof OptionSelector>;

const Template: ComponentStory<typeof OptionSelector> = (args) => {
  const [option, setOption] = useState(optionSelectorPropsMocked.selected);
  const onOptionClick = useCallback((opt: TOption) => {
    setOption(opt);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <OptionSelector {...args} selected={option} setSelected={onOptionClick} />
    </div>
  );
};
export const Default = Template.bind({});

Default.args = optionSelectorPropsMocked;
