import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const LightTheme: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M10 1V2M10 18V19M19 10H18M2 10H1M16.364 16.364L15.6569 15.6569M4.34315 4.34315L3.63604 3.63604M16.364 3.63609L15.6569 4.3432M4.3432 15.6569L3.63609 16.364M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
