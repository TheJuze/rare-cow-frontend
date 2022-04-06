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
  const error = text('Error', '');
  const isCorrect = boolean('IsCorrect', false);
  const disabled = boolean('disabled', false);
  const onChange = action('onChange');
  return (
    <>
      <div style={{ width: 200, marginLeft: 12 }}>
        <Input
          id="id"
          name="storybook"
          label="Default"
          placeholder="Text text"
          error={error}
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
          endAdornment={<StarIcon />}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Default"
          placeholder="Text text"
          error={error}
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
        />
        <div style={{ marginBottom: 16 }}>
          <Input
            id="id3"
            name="storybook"
            placeholder="Text text"
            label="Default"
            disabled={disabled}
            error="Error caption"
            onChange={onChange}
            endAdornment={<StarIcon />}
          />
        </div>
        <Input
          id="id4"
          name="storybook"
          placeholder="Text text"
          label="Default"
          disabled={disabled}
          success="Success caption"
          onChange={onChange}
          endAdornment={<StarIcon />}
        />
      </div>
    </>
  );
};
export const Default = Template.bind({});

Default.args = inputPropsMocked;
