import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const TriangleDownIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="13" height="7" viewBox="0 0 13 7" fill="none" {...props}>
    <path
      d="M12.2326 4.4976e-07C12.9149 4.76525e-07 13.2566 0.794916 12.7742 1.25982L7.04154 6.78385C6.74245 7.07205 6.25754 7.07205 5.95846 6.78385L0.225848 1.25982C-0.256611 0.794915 0.0850861 -2.67654e-08 0.767387 0L12.2326 4.4976e-07Z"
      fill="currentColor"
      fillOpacity="0.5"
    />
  </BaseSVGIcon>
);
