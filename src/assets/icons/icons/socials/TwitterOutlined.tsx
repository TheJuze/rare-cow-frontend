import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from '../components/BaseSVGIcon';

export const TwitterOutlinedIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="14" height="13" viewBox="0 0 14 13" fill="none" {...props}>
    <path
      d="M1.00034 10.5C1.00034 10.5 3.50034 10 4.00034 8.5C4.00034 8.5 0.000337561 7 1.00034 1.5C1.00034 1.5 3.00034 4 6.00034 4.5V3.50018C6.00039 2.92578 6.19821 2.36891 6.56053 1.9232C6.92285 1.47749 7.42758 1.17012 7.98987 1.05275C8.55215 0.93539 9.13769 1.0152 9.64806 1.27876C10.1584 1.54232 10.5625 1.97356 10.7923 2.49998L13.0003 2.5L11.0003 4.5C11.0003 8 8.50034 11.5 4.00034 11.5C2.00034 11.5 1.00034 10.5 1.00034 10.5Z"
      stroke="#5D5FEF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
