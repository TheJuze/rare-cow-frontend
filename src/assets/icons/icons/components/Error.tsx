import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Error: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="100" height="100" viewBox="0 0 100 100" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM42.7364 22.1588H57.2495L55.9222 63.1589H44.0637L42.7364 22.1588ZM57.5092 74.5847C57.4515 78.7395 53.9602 82.0865 50.0074 82.0865C45.8526 82.0865 42.4479 78.7395 42.5056 74.5847C42.4479 70.4876 45.8526 67.1695 50.0074 67.1695C53.9602 67.1695 57.4515 70.4876 57.5092 74.5847Z"
      fill="currentColor"
    />
  </BaseSVGIcon>
);
