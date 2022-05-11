import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const ExitSVG: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <path
      d="M17.5 16L21.5 12M21.5 12L17.5 8M21.5 12L7.5 12M13.5 16V17C13.5 18.6569 12.1569 20 10.5 20H6.5C4.84315 20 3.5 18.6569 3.5 17V7C3.5 5.34315 4.84315 4 6.5 4H10.5C12.1569 4 13.5 5.34315 13.5 7V8"
      stroke="#5D5FEF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
