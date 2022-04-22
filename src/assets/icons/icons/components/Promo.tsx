import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Promo: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <rect y="0.23877" width="24" height="24" rx="12" fill="#FD6B6B" />
    <g clipPath="url(#clip0_963_20588)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9755 5.02352C13.2877 5.12194 13.5 5.41147 13.5 5.73882V9.48882L16.5 9.48882C16.7797 9.48882 17.0361 9.64442 17.1652 9.89247C17.2944 10.1405 17.2748 10.4398 17.1144 10.6689L11.8644 18.1689C11.6767 18.4371 11.3367 18.5525 11.0245 18.4541C10.7123 18.3557 10.5 18.0662 10.5 17.7388L10.5 13.9888H7.5C7.22035 13.9888 6.96392 13.8332 6.83477 13.5852C6.70562 13.3371 6.72521 13.0378 6.88558 12.8087L12.1356 5.30873C12.3233 5.04055 12.6633 4.92511 12.9755 5.02352Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_963_20588">
        <rect width="15" height="15" fill="white" transform="translate(4.5 4.23877)" />
      </clipPath>
    </defs>
  </BaseSVGIcon>
);
