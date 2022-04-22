import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const PenIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="13" height="12" viewBox="0 0 13 12" fill="none" {...props}>
    <path
      d="M9.36865 0.868776C9.99349 0.243937 11.0066 0.243937 11.6314 0.868776C12.2562 1.49361 12.2562 2.50668 11.6314 3.13152L10.9971 3.76583L8.73434 1.50309L9.36865 0.868776Z"
      fill="#5D5FEF"
    />
    <path
      d="M7.60297 2.63446L0.900024 9.3374V11.6001H3.16276L9.86571 4.8972L7.60297 2.63446Z"
      fill="#5D5FEF"
    />
  </BaseSVGIcon>
);
