import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Bided: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M3.25 8L4.25 9M9.75 14.5L8.75 13.5M4.25 9L11.25 2L15.75 6.5M4.25 9L8.75 13.5M15.75 6.5L16.75 7.5L10.25 1M15.75 6.5L12.25 10M8.75 13.5L12.25 10M12.25 10L17.25 15"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M0.75 17H10.25" stroke="currentColor" strokeWidth="2" />
  </BaseSVGIcon>
);
