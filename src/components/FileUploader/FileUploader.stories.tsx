import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FileUploader } from './FileUploader';
import { fileUploaderPropsMocked } from './FileUploader.mock';

export default {
  title: 'components/FileUploader',
  component: FileUploader,
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = (args) => (
  <>
    <FileUploader {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = fileUploaderPropsMocked;
