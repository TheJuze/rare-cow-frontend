import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const ArrowHeadUpIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M4.16699 12.5L10.0003 6.66669L15.8337 12.5"
      stroke="#C7C9D9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
