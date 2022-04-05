import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const StarIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    fill="black"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5616 21.0007C17.4036 21.0007 17.2446 20.9637 17.0986 20.8877L11.9996 18.2237L6.90162 20.8877C6.56362 21.0627 6.15562 21.0327 5.84962 20.8087C5.54162 20.5847 5.38862 20.2057 5.45362 19.8307L6.42462 14.2027L2.30462 10.2177C2.03062 9.95272 1.93162 9.55472 2.04862 9.19072C2.16562 8.82872 2.47862 8.56372 2.85662 8.50972L8.55662 7.68172L11.1046 2.55572C11.4426 1.87572 12.5576 1.87572 12.8956 2.55572L15.4436 7.68172L21.1436 8.50972C21.5216 8.56372 21.8346 8.82872 21.9516 9.19072C22.0686 9.55472 21.9696 9.95272 21.6956 10.2177L17.5756 14.2027L18.5466 19.8307C18.6116 20.2057 18.4576 20.5847 18.1506 20.8087C17.9766 20.9367 17.7696 21.0007 17.5616 21.0007Z" fill="#8A7FF6" />
    <mask id="mask0_123_1409" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="2" width="24" height="24">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5616 21.0007C17.4036 21.0007 17.2446 20.9637 17.0986 20.8877L11.9996 18.2237L6.90162 20.8877C6.56362 21.0627 6.15562 21.0327 5.84962 20.8087C5.54162 20.5847 5.38862 20.2057 5.45362 19.8307L6.42462 14.2027L2.30462 10.2177C2.03062 9.95272 1.93162 9.55472 2.04862 9.19072C2.16562 8.82872 2.47862 8.56372 2.85662 8.50972L8.55662 7.68172L11.1046 2.55572C11.4426 1.87572 12.5576 1.87572 12.8956 2.55572L15.4436 7.68172L21.1436 8.50972C21.5216 8.56372 21.8346 8.82872 21.9516 9.19072C22.0686 9.55472 21.9696 9.95272 21.6956 10.2177L17.5756 14.2027L18.5466 19.8307C18.6116 20.2057 18.4576 20.5847 18.1506 20.8087C17.9766 20.9367 17.7696 21.0007 17.5616 21.0007Z" fill="white" />
    </mask>
    <g mask="url(#mask0_123_1409)" />
  </BaseSVGIcon>
);
