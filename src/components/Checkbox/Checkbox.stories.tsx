import { useCallback, useState } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { MouseEventHandler } from 'react';

import { Checkbox } from './Checkbox';
import { checkboxPropsMocked } from './Checkbox.mock';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false);
  const onCheckboxChange: MouseEventHandler<HTMLInputElement> = useCallback(() => {
    setChecked(!checked);
  }, [checked]);
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
      <Checkbox value={checked} onChange={onCheckboxChange} {...args}>
        value
      </Checkbox>
    </div>
  );
};
export const Default = Template.bind({});

Default.args = checkboxPropsMocked;
