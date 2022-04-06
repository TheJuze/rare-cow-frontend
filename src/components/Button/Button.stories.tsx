/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StarIcon } from 'assets/icons/icons';
import { Text } from 'components/Typography';
import { FC, PropsWithChildren } from 'react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'basic-components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

type TTemplateProps = FC<PropsWithChildren<ButtonProps & { designSrc: string }>>;

const Template: ComponentStory<TTemplateProps> = (args) => (
  <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Text>
        Buttons
        <a style={{ color: '#000', marginLeft: '10px' }} href={args.designSrc} target="_blank" rel="noreferrer">
          Design source link
        </a>
      </Text>
      <Button {...args}>Button</Button>
      <Button {...args} endAdornment={<StarIcon />}>
        Button
      </Button>
      <Button {...args} startAdornment={<StarIcon />}>
        Button
      </Button>
      <Button {...args} endAdornment={<StarIcon />} startAdornment={<StarIcon />}>
        Button
      </Button>
      <Button {...args} disabled>
        Button
      </Button>
      <Button {...args} startAdornment={<StarIcon />} disabled>
        Button
      </Button>
      Link
      <Button {...args} to="/profile">
        Button
      </Button>
      Anchor
      <Button {...args} href="https://google.com">
        Button
      </Button>
    </div>
  </div>
);
export const FilledCommon = Template.bind({});
FilledCommon.args = {
  variant: 'filled',
  color: 'common',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A18711',
};

export const FilledCommonSmall = Template.bind({});
FilledCommon.args = {
  variant: 'filled',
  color: 'common',
  size: 'sm',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A18711',
};

export const FilledPrimary = Template.bind({});
FilledPrimary.args = {
  variant: 'filled',
  color: 'primary',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A19511',
};

export const FilledPrimarySmall = Template.bind({});
FilledPrimarySmall.args = {
  variant: 'filled',
  color: 'primary',
  size: 'sm',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A19511',
};

export const FilledSecondary = Template.bind({});
FilledSecondary.args = {
  variant: 'filled',
  color: 'secondary',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=204%3A61098',
};

export const FilledSecondarySmall = Template.bind({});
FilledSecondarySmall.args = {
  variant: 'filled',
  color: 'secondary',
  size: 'sm',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=204%3A61098',
};

export const OutlinedCommon = Template.bind({});
OutlinedCommon.args = {
  variant: 'outlined',
  color: 'common',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A18731',
};

export const OutlinedCommonSmall = Template.bind({});
OutlinedCommonSmall.args = {
  variant: 'outlined',
  color: 'common',
  size: 'sm',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A18731',
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  variant: 'outlined',
  color: 'primary',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A20111',
};

export const OutlinedPrimarySmall = Template.bind({});
OutlinedPrimarySmall.args = {
  variant: 'outlined',
  color: 'primary',
  size: 'sm',
  active: false,
  designSrc: 'https://www.figma.com/file/BIdtqmR2JbDRcPBMMA1HA6/RareCow-NFT?node-id=115%3A20111',
};
