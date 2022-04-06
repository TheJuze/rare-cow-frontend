import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Dropdown } from './Dropdown';
import { dropdownPropsMocked } from './Dropdown.mock';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const options = [
  { value: 'Text1', symbol: 'Text input' },
  { value: 'Text2', symbol: 'Text input2' },
  { value: 'Text3', symbol: 'Text input3' },
];

const Template: ComponentStory<typeof Dropdown> = () => {
  const [value, setValue] = useState(options[0]);
  return (
    <>
      <Dropdown value={value} setValue={setValue} options={options} label="Default label" />
    </>
  );
};
export const Default = Template.bind({});

Default.args = dropdownPropsMocked;
