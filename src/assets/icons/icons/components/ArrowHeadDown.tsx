import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const ArrowHeadDownIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M15.833 7.49998L9.99967 13.3333L4.16634 7.49998"
      stroke="#C7C9D9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
