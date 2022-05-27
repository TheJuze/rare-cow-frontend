import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const PlaceABidIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      d="M10.2207 16.2141V17.8808H0.220703V16.2141H10.2207ZM10.709 0.119141L17.1907 6.60081L16.0124 7.78081L15.129 7.48581L13.0649 9.54747L17.779 14.2616L16.6007 15.44L11.8874 10.7258L9.88404 12.7291L10.1199 13.6725L8.9407 14.8508L2.45904 8.36914L3.6382 7.19081L4.57987 7.42581L9.82487 2.18164L9.5307 1.29831L10.709 0.119141ZM11.2982 3.06581L5.4057 8.95747L8.35154 11.9041L14.244 6.01247L11.2982 3.06581Z"
      fill="currentColor"
    />
  </BaseSVGIcon>
);
