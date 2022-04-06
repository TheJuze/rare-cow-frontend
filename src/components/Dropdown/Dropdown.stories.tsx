import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Dropdown } from './Dropdown';
import { dropdownPropsMocked } from './Dropdown.mock';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const options = [
  { value: 'Text input', symbol: 'text' },
  { value: 'Text input2', symbol: 'text2' },
  { value: 'Text input3', symbol: 'text3' },
];

const Template: ComponentStory<typeof Dropdown> = () => {
  const [value, setValue] = useState(options[0]);
  return (
    <>
      <Dropdown value={value} setValue={setValue} options={options} />
    </>
  );
};
export const Default = Template.bind({});

Default.args = dropdownPropsMocked;
