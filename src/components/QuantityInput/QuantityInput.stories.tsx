import { useState } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { QuantityInput } from './QuantityInput';
import { quantityInputPropsMocked } from './QuantityInput.mock';

export default {
  title: 'components/QuantityInput',
  component: QuantityInput,
} as ComponentMeta<typeof QuantityInput>;

const Template: ComponentStory<typeof QuantityInput> = () => {
  const [input, setInput] = useState('1');

  return (
    <>
      <QuantityInput
        name="quantity"
        value={input}
        setValue={setInput}
        writeable={false}
        minAmount={1}
        maxAmount={99}
      />
    </>
  );
};
export const Default = Template.bind({});

Default.args = quantityInputPropsMocked;
