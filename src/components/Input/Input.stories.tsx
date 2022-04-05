import { ComponentMeta, ComponentStory } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { StarIcon } from 'assets/icons/icons';
import { Input } from './Input';
import { inputPropsMocked } from './Input.mock';

export default {
  title: 'basic-components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = () => {
  const placeholder = text('Placeholder', 'Enter your e-mail');
  const error = text('Error', '');
  const isCorrect = boolean('IsCorrect', false);
  const disabled = boolean('disabled', false);
  const onChange = action('onChange');
  return (
    <>
      <div style={{ width: 400 }}>
        <Input
          id="id"
          name="storybook"
          label={placeholder}
          error={error}
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
          endAdorment={<StarIcon />}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Label"
          placeholder="Placeholder"
          error={error}
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
        />
        <Input
          id="id"
          name="storybook"
          label={placeholder}
          error
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
          endAdorment={<StarIcon />}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Label"
          placeholder="Placeholder"
          error
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
        />
      </div>
    </>
  );
};
export const Default = Template.bind({});

Default.args = inputPropsMocked;
