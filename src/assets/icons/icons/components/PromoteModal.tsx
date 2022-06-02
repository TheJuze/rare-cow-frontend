import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const PromoteModalIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="41" height="40" fill="transparent" viewBox="0 0 41 40" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.8006 11.0463C22.2169 11.1776 22.5 11.5636 22.5 12.0001V17.0001L26.5 17.0001C26.8729 17.0001 27.2148 17.2075 27.387 17.5383C27.5592 17.869 27.5331 18.2681 27.3192 18.5735L20.3192 28.5735C20.0689 28.9311 19.6156 29.085 19.1994 28.9538C18.7831 28.8226 18.5 28.4365 18.5 28.0001L18.5 23.0001H14.5C14.1271 23.0001 13.7852 22.7926 13.613 22.4619C13.4408 22.1312 13.4669 21.7321 13.6808 21.4266L20.6808 11.4266C20.9311 11.069 21.3844 10.9151 21.8006 11.0463Z"
      fill="#FD6B6B"
    />
    <rect
      x="0.916667"
      y="0.416667"
      width="39.1667"
      height="39.1667"
      rx="19.5833"
      stroke="#FDA5AF"
      strokeWidth="0.833333"
    />
  </BaseSVGIcon>
);
