import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const SearchIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="24" fill="transparent" viewBox="0 0 24 24" {...props}>
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="#1A1A1A"
      strokeOpacity="0.7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill=""
    />
  </BaseSVGIcon>
);
