import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { SearchIcon, StarIcon } from 'assets/icons/icons';
import { EInputStatus } from 'types';
import { Input } from './Input';
import { inputPropsMocked } from './Input.mock';

export default {
  title: 'basic-components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = () => {
  const isCorrect = boolean('IsCorrect', false);
  const disabled = boolean('disabled', false);
  const onChange = action('onChange');
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '32px',
          padding: '10px',
        }}
      >
        <Input
          id="id"
          name="storybook"
          label="With icons"
          placeholder="Text"
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
          endAdornment={<StarIcon />}
          startAdornment={<SearchIcon />}
        />
        <Input
          id="id3"
          name="storybook"
          placeholder="Text text"
          label="With single icon"
          disabled={disabled}
          onChange={onChange}
          endAdornment={<StarIcon />}
        />
        <Input
          id="id5"
          name="storybook"
          placeholder="Text text"
          label="With error"
          disabled={disabled}
          onChange={onChange}
          caption={{ status: EInputStatus.ERROR, caption: 'error' }}
          endAdornment={<StarIcon />}
        />
        <Input
          id="id6"
          name="storybook"
          placeholder="Text text"
          label="Success"
          disabled={disabled}
          onChange={onChange}
          caption={{ status: EInputStatus.SUCCESS, caption: 'success' }}
          endAdornment={<StarIcon />}
        />
        <Input
          id="id4"
          name="storybook"
          placeholder="Text text"
          label="Default disabled"
          disabled
          onChange={onChange}
          caption={{ status: EInputStatus.COMMON, caption: 'default' }}
          endAdornment={<StarIcon />}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '32px',
          padding: '10px',
        }}
      >
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Default"
          placeholder="Text text"
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Default disabled"
          placeholder="Text text"
          disabled
          isCorrect={isCorrect}
          caption={{ status: EInputStatus.COMMON, caption: 'default' }}
          onChange={onChange}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="With error"
          placeholder="Text text"
          caption={{ status: EInputStatus.ERROR, caption: 'error' }}
          disabled={disabled}
          isCorrect={isCorrect}
          onChange={onChange}
        />
        <Input
          id="id2"
          name="storybook"
          component="textarea"
          label="Success"
          placeholder="Text text"
          disabled={disabled}
          caption={{ status: EInputStatus.SUCCESS, caption: 'success' }}
          isCorrect={isCorrect}
          onChange={onChange}
        />
      </div>
    </>
  );
};
export const Default = Template.bind({});

Default.args = inputPropsMocked;
