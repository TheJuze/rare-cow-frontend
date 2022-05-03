import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const ArrowGreen: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="14" height="10" viewBox="0 0 14 10" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2129 9.49999H2.7869C2.1139 9.49999 1.5069 9.09799 1.2019 8.45099C0.856899 7.71799 0.956899 6.85099 1.4599 6.24099L5.6739 1.14199C6.3459 0.324986 7.6539 0.324986 8.3259 1.14199L12.5389 6.23999C13.0429 6.85099 13.1439 7.71799 12.7979 8.45099C12.4929 9.09799 11.8859 9.49999 11.2129 9.49999Z"
      fill="#40DA59"
    />
  </BaseSVGIcon>
);
