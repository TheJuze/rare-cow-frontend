import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const Dots: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="12" fill="#1A1A1A" fillOpacity="0.05" />
    <path
      d="M8.79998 12C8.79998 12.8837 8.08363 13.6 7.19998 13.6C6.31632 13.6 5.59998 12.8837 5.59998 12C5.59998 11.1164 6.31632 10.4 7.19998 10.4C8.08363 10.4 8.79998 11.1164 8.79998 12Z"
      fill="#5D5FEF"
    />
    <path
      d="M13.6 12C13.6 12.8837 12.8836 13.6 12 13.6C11.1163 13.6 10.4 12.8837 10.4 12C10.4 11.1164 11.1163 10.4 12 10.4C12.8836 10.4 13.6 11.1164 13.6 12Z"
      fill="#5D5FEF"
    />
    <path
      d="M16.8 13.6C17.6836 13.6 18.4 12.8837 18.4 12C18.4 11.1164 17.6836 10.4 16.8 10.4C15.9163 10.4 15.2 11.1164 15.2 12C15.2 12.8837 15.9163 13.6 16.8 13.6Z"
      fill="#5D5FEF"
    />
  </BaseSVGIcon>
);
