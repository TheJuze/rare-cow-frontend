import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const LightningIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8006 1.54633C12.2169 1.67755 12.5 2.0636 12.5 2.50007V7.50007L16.5 7.50007C16.8729 7.50007 17.2148 7.70753 17.387 8.03826C17.5592 8.36899 17.5331 8.76806 17.3192 9.07353L10.3192 19.0735C10.0689 19.4311 9.61564 19.585 9.19936 19.4538C8.78309 19.3226 8.5 18.9365 8.5 18.5001L8.5 13.5001H4.5C4.12713 13.5001 3.78522 13.2926 3.61302 12.9619C3.44083 12.6312 3.46694 12.2321 3.68077 11.9266L10.6808 1.92661C10.9311 1.56904 11.3844 1.41511 11.8006 1.54633Z"
      fill="#F9FAFB"
    />
  </BaseSVGIcon>
);
