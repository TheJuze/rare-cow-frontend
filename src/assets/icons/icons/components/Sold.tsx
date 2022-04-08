import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Sold: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M3 5H17M3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3C19 4.10457 18.1046 5 17 5M3 5L3 15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V5M8 9H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
