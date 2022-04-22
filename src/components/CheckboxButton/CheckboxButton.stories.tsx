import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CheckboxButton } from './CheckboxButton';
import { checkboxButtonPropsMocked } from './CheckboxButton.mock';

export default {
  title: 'components/CheckboxButton',
  component: CheckboxButton,
} as ComponentMeta<typeof CheckboxButton>;

const Template: ComponentStory<typeof CheckboxButton> = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <CheckboxButton
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        content="Text"
      />
    </>
  );
};
export const Default = Template.bind({});

Default.args = checkboxButtonPropsMocked;
