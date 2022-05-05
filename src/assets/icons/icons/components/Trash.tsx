import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const TrashIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="black" viewBox="0 0 20 20" {...props}>
    <path
      d="M15.8335 5.83333L15.1107 15.9521C15.0484 16.8243 14.3227 17.5 13.4483 17.5H6.55203C5.67763 17.5 4.9519 16.8243 4.8896 15.9521L4.16683 5.83333M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M12.5002 5.83333V3.33333C12.5002 2.8731 12.1271 2.5 11.6668 2.5H8.3335C7.87326 2.5 7.50016 2.8731 7.50016 3.33333V5.83333M3.3335 5.83333H16.6668"
      stroke="#9CA3B0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
