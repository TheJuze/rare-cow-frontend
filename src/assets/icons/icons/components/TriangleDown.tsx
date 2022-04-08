import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const TriangleDownIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="24" fill="transparent" viewBox="0 0 24 24" {...props}>
    <path
      d="M18.2326 9C18.9149 9 19.2566 9.79492 18.7742 10.2598L13.0415 15.7838C12.7425 16.0721 12.2575 16.0721 11.9585 15.7838L6.22585 10.2598C5.74339 9.79491 6.08509 9 6.76739 9L18.2326 9Z"
      fill="#8F90A6"
    />
  </BaseSVGIcon>
);
