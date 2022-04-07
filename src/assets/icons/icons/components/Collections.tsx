import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Collections: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M17 9H3M17 9C18.1046 9 19 9.89543 19 11V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V11C1 9.89543 1.89543 9 3 9M17 9V7C17 5.89543 16.1046 5 15 5M3 9V7C3 5.89543 3.89543 5 5 5M5 5V3C5 1.89543 5.89543 1 7 1H13C14.1046 1 15 1.89543 15 3V5M5 5H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
