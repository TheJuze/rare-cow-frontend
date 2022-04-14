import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const CreateNFT: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 8H10.5V6C10.5 5.45 10.05 5 9.5 5C8.95 5 8.5 5.45 8.5 6V8H6.5C5.95 8 5.5 8.45 5.5 9C5.5 9.55 5.95 10 6.5 10H8.5V12C8.5 12.55 8.95 13 9.5 13C10.05 13 10.5 12.55 10.5 12V10H12.5C13.05 10 13.5 9.55 13.5 9C13.5 8.45 13.05 8 12.5 8ZM16.5 15C16.5 15.551 16.052 16 15.5 16H3.5C2.948 16 2.5 15.551 2.5 15V3C2.5 2.449 2.948 2 3.5 2H15.5C16.052 2 16.5 2.449 16.5 3V15ZM15.5 0H3.5C1.846 0 0.5 1.346 0.5 3V15C0.5 16.654 1.846 18 3.5 18H15.5C17.154 18 18.5 16.654 18.5 15V3C18.5 1.346 17.154 0 15.5 0Z"
      fill="#5D5FEF"
    />
  </BaseSVGIcon>
);
